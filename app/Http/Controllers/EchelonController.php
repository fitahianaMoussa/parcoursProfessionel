<?php

namespace App\Http\Controllers;

use App\Models\Echelon;
use App\Models\Grade;
use App\Http\Requests\StoreEchelonRequest; 
use App\Http\Requests\UpdateEchelonRequest; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class EchelonController extends Controller
{
    public function index(Request $request)
    {
    
        $echelons = Echelon::with('grade')
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('grade', function($query) use ($search) {
                    $query->where('nom', 'like', "%{$search}%"); 
                })
                ->orWhere('numero', 'like', "%{$search}%"); 
            })
            ->paginate(10); 
    
    
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $echelons->previousPageUrl(),
                'active' => $echelons->onFirstPage(),
            ],
            ...collect($echelons->getUrlRange(1, $echelons->lastPage()))->map(function ($url, $page) use ($echelons) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $echelons->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $echelons->nextPageUrl(),
                'active' => $echelons->hasMorePages(),
            ],
        ]);

        return Inertia::render('Echelons/Index', [
            'echelons' => $echelons->items(),
            'meta' => [
                'links' => $links,
                'current_page' => $echelons->currentPage(),
                'last_page' => $echelons->lastPage(),
                'total' => $echelons->total(),
                'per_page' => $echelons->perPage(),
            ],
        ]);
    }
    

    public function create()
    {
        $grades = Grade::all();
        return Inertia::render('Echelons/Create', ['grades' => $grades]);
    }

    public function store(StoreEchelonRequest $request) 
    {
        Echelon::create($request->validated());
        return redirect()->route('echelons.index')->with('success', 'Echelon created successfully.');
    }

    public function show(Echelon $echelon)
    {
        return Inertia::render('Echelons/Show', ['echelon' => $echelon]);
    }

    public function edit(Echelon $echelon)
    {
        $grades = Grade::all();
        return Inertia::render('Echelons/Edit', ['echelon' => $echelon, 'grades' => $grades]);
    }

    public function update(UpdateEchelonRequest $request, Echelon $echelon) 
    {
        $echelon->update($request->validated());
        return redirect()->route('echelons.index')->with('success', 'Echelon updated successfully.');
    }

    public function destroy(Echelon $echelon)
    {
        $echelon->delete();
        return redirect()->route('echelons.index')->with('success', 'Echelon deleted successfully.');
    }
}
