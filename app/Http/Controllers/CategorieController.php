<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use App\Models\Diplome;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    public function index(Request $request)
    {
        $categories = Categorie::with('diplomeMinRequis')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('nom', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%"); // Add more fields if necessary
            })
            ->paginate(10);
    
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $categories->previousPageUrl(),
                'active' => $categories->onFirstPage(),
            ],
            ...collect($categories->getUrlRange(1, $categories->lastPage()))->map(function ($url, $page) use ($categories) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $categories->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $categories->nextPageUrl(),
                'active' => $categories->hasMorePages(),
            ],
        ]);
    
        return Inertia::render('Categories/Index', [
            'categories' => $categories->items(), // Get only the items from the paginated result
            'meta' => [
                'links' => $links,
            ],
            'diplomes' => Diplome::all()
        ]);
    }
    

    public function create()
    {
        $diplomes = Diplome::all();
        return Inertia::render('Categories/Create', compact('diplomes'));
    }

    public function store(StoreCategorieRequest $request)
    {
        Categorie::create($request->validated());
        return redirect()->route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit(Categorie $categorie)
    {
        $diplomes = Diplome::all();
        return Inertia::render('Categories/Edit', compact('categorie', 'diplomes'));
    }

    public function update(UpdateCategorieRequest $request, Categorie $categorie)
    {
        $categorie->update($request->validated());
        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy(Categorie $categorie)
    {
        $categorie->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully!');
    }
}
