<?php

namespace App\Http\Controllers;

use App\Models\Corp;
use App\Models\Diplome;
use App\Http\Requests\StoreCorpRequest;
use App\Http\Requests\UpdateCorpRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CorpController extends Controller
{
    public function index(Request $request)
{
    $corps = Corp::with('diplomeMinRequis')
        ->when($request->input('search'), function ($query, $search) {
            $query->where('nom', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%"); // Add more fields if necessary
        })
        ->paginate(10);

    $links = collect([
        [
            'label' => '&laquo; Previous',
            'url' => $corps->previousPageUrl(),
            'active' => $corps->onFirstPage(),
        ],
        ...collect($corps->getUrlRange(1, $corps->lastPage()))->map(function ($url, $page) use ($corps) {
            return [
                'label' => $page,
                'url' => $url,
                'active' => $corps->currentPage() === $page,
            ];
        })->toArray(),
        [
            'label' => 'Next &raquo;',
            'url' => $corps->nextPageUrl(),
            'active' => $corps->hasMorePages(),
        ],
    ]);

    return Inertia::render('Corps/Index', [
        'corps' => $corps->items(), 
        'meta' => [
            'links' => $links,
        ],
    ]);
}


    public function create()
    {
        $diplomes = Diplome::all();
        return Inertia::render('Corps/Create', [
            'diplomes' => $diplomes
        ]);
    }

    public function store(StoreCorpRequest $request)
    {
        Corp::create($request->validated());
        return redirect()->route('corps.index')->with('success', 'Corp created successfully.');
    }

    public function show(Corp $corp)
    {
        return Inertia::render('Corps/Show', [
            'corp' => $corp->load('diplomeMinRequis')
        ]);
    }

    public function edit(Corp $corp)
    {
        $diplomes = Diplome::all();
        return Inertia::render('Corps/Edit', [
            'corp' => $corp,
            'diplomes' => $diplomes
        ]);
    }

    public function update(UpdateCorpRequest $request, Corp $corp)
    {
        $corp->update($request->validated());
        return redirect()->route('corps.index')->with('success', 'Corp updated successfully.');
    }

    public function destroy(Corp $corp)
    {
        $corp->delete();
        return redirect()->route('corps.index')->with('success', 'Corp deleted successfully.');
    }
}
