<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDiplomeRequest;
use App\Http\Requests\UpdateDiplomeRequest;
use App\Models\Diplome;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiplomeController extends Controller
{
    public function index(Request $request)
    {
        $diplomes = Diplome::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('nom', 'like', "%{$search}%")
                      ->orWhere('niveau', 'like', "%{$search}%");
            })
            ->paginate(10);
    
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $diplomes->previousPageUrl(),
                'active' => $diplomes->onFirstPage(),
            ],
            ...collect($diplomes->getUrlRange(1, $diplomes->lastPage()))->map(function ($url, $page) use ($diplomes) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $diplomes->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $diplomes->nextPageUrl(),
                'active' => $diplomes->hasMorePages(),
            ],
        ]);
    
        return inertia('Diplomes/Index', [
            //'auth' => auth()->user(),
            'diplomes' => $diplomes->items(), // Get only the items from the paginated result
            'meta' => [
                'links' => $links,
            ],
        ]);
    }
    


    public function create()
    {
        return Inertia::render('Diplomes/Create');
    }

    public function store(StoreDiplomeRequest $request)
    {
        Diplome::create($request->validated());
        return redirect()->route('diplomes.index')->with('success', 'Diplome created successfully!');
    }

    public function edit(Diplome $diplome)
    {
        return Inertia::render('Diplomes/Edit', compact('diplome'));
    }

    public function update(UpdateDiplomeRequest $request, Diplome $diplome)
    {
        $diplome->update($request->validated());
        return redirect()->route('diplomes.index')->with('success', 'Diplome updated successfully!');
    }

    public function destroy(Diplome $diplome)
    {
        $diplome->delete();
        return redirect()->route('diplomes.index')->with('success', 'Diplome deleted successfully!');
    }
}
