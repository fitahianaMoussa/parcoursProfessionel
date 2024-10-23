<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReclassementRequest;
use App\Models\Categorie;
use App\Models\Reclassement;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReclassementController extends Controller
{
    public function index(Request $request): Response
    {
        $reclassements = Reclassement::with(['employe', 'ancienCategorie', 'nouvelleCategorie'])
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('employe', function($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%"); 
                })
                ->orWhereHas('ancienCategorie', function($query) use ($search) {
                    $query->where('nom', 'like', "%{$search}%");
                })
                ->orWhereHas('nouvelleCategorie', function($query) use ($search) {
                    $query->where('nom', 'like', "%{$search}%");
                });
            })
            ->paginate(10);
    
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $reclassements->previousPageUrl(),
                'active' => $reclassements->onFirstPage(),
            ],
            ...collect($reclassements->getUrlRange(1, $reclassements->lastPage()))->map(function ($url, $page) use ($reclassements) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $reclassements->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $reclassements->nextPageUrl(),
                'active' => $reclassements->hasMorePages(),
            ],
        ]);
    
        return Inertia::render('Reclassements/Index', [
            'reclassements' => $reclassements->items(),
            'meta' => [
                'links' => $links,
                'current_page' => $reclassements->currentPage(),
                'last_page' => $reclassements->lastPage(),
                'total' => $reclassements->total(),
                'per_page' => $reclassements->perPage(),
            ],
        ]);
    }
    
    

    public function create(): Response
{
    $categories = Categorie::all();
    $employees = User::all(); 
    return Inertia::render('Reclassements/Create', [
        'categories' => $categories,
        'employees' => $employees, 
    ]);
}

public function edit(Reclassement $reclassement): Response
{
    $categories = Categorie::all();
    $employees = User::all(); 
    return Inertia::render('Reclassements/Edit', [
        'reclassement' => $reclassement,
        'categories' => $categories,
        'employees' => $employees, 
    ]);
}


    public function store(StoreReclassementRequest $request)
    {
        Reclassement::create($request->validated());
        return redirect()->route('reclassements.index')->with('success', 'Reclassement created successfully.');
    }

    public function update(StoreReclassementRequest $request, Reclassement $reclassement)
    {
        $reclassement->update($request->validated());
        return redirect()->route('reclassements.index')->with('success', 'Reclassement updated successfully.');
    }

    public function destroy(Reclassement $reclassement)
    {
        $reclassement->delete();
        return redirect()->route('reclassements.index')->with('success', 'Reclassement deleted successfully.');
    }
}
