<?php

namespace App\Http\Controllers;

use App\Models\Contrat;
use App\Models\Service; 
use App\Http\Requests\StoreContratRequest; 
use App\Http\Requests\UpdateContratRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContratController extends Controller
{
    public function index(Request $request)
{
    
    $contrats = Contrat::with(['employe', 'nouveauService'])
        ->when($request->input('search'), function ($query, $search) {
          
            $query->where('id', 'like', "%{$search}%")
                  ->orWhereHas('employe', function ($query) use ($search) {
                      $query->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('nouveauService', function ($query) use ($search) {
                      $query->where('nom', 'like', "%{$search}%");
                  });
        })
        ->paginate(10); 

 
    $links = collect([
        [
            'label' => '&laquo; Previous',
            'url' => $contrats->previousPageUrl(),
            'active' => $contrats->onFirstPage(),
        ],
        ...collect($contrats->getUrlRange(1, $contrats->lastPage()))->map(function ($url, $page) use ($contrats) {
            return [
                'label' => $page,
                'url' => $url,
                'active' => $contrats->currentPage() === $page,
            ];
        })->toArray(),
        [
            'label' => 'Next &raquo;',
            'url' => $contrats->nextPageUrl(),
            'active' => $contrats->hasMorePages(),
        ],
    ]);

    return Inertia::render('Contrats/Index', [
        'contrats' => $contrats->items(), 
        'meta' => [
            'links' => $links,
            'current_page' => $contrats->currentPage(),
            'last_page' => $contrats->lastPage(),
            'total' => $contrats->total(),
            'per_page' => $contrats->perPage(),
        ],
    ]);
}


    public function create()
    {
        $services = Service::all(); 
        $employes = User::all(); 

        return Inertia::render('Contrats/Create', [
            'services' => $services,
            'employes' => $employes, 
        ]);
    }

    public function store(StoreContratRequest $request)
    {
        Contrat::create($request->validated());
        return redirect()->route('contrats.index')->with('success', 'Contrat created successfully.');
    }

    public function edit(Contrat $contrat)
    {
        $services = Service::all(); 
        $employes = User::all(); 

        return Inertia::render('Contrats/Edit', [
            'contrat' => $contrat,
            'services' => $services,
            'employes' => $employes,
        ]);
    }

    public function update(UpdateContratRequest $request, Contrat $contrat)
    {
        $contrat->update($request->validated());
        return redirect()->route('contrats.index')->with('success', 'Contrat updated successfully.');
    }

    public function destroy(Contrat $contrat)
    {
        $contrat->delete();
        return redirect()->route('contrats.index')->with('success', 'Contrat deleted successfully.');
    }
}
