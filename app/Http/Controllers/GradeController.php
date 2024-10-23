<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\UpdateGradeRequest;
use App\Models\Grade;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        $grades = Grade::with('categorie')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('nom', 'like', "%{$search}%") // Search by name
                      ->orWhereHas('categorie', function($query) use ($search) {
                          $query->where('nom', 'like', "%{$search}%"); // Search in related categories
                      });
            })
            ->paginate(10);
    
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $grades->previousPageUrl(),
                'active' => $grades->onFirstPage(),
            ],
            ...collect($grades->getUrlRange(1, $grades->lastPage()))->map(function ($url, $page) use ($grades) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $grades->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $grades->nextPageUrl(),
                'active' => $grades->hasMorePages(),
            ],
        ]);
    
        return Inertia::render('Grades/Index', [
            'grades' => $grades->items(),
            'meta' => [
                'links' => $links,
                'current_page' => $grades->currentPage(),
                'last_page' => $grades->lastPage(),
                'total' => $grades->total(),
                'per_page' => $grades->perPage(),
            ],
        ]);
    }
    

    public function create()
    {
        $categories = Categorie::all();
        return Inertia::render('Grades/Create', [
            'categories' => $categories
        ]);
    }

    public function store(StoreGradeRequest $request)
    {
        Grade::create($request->validated());
        return redirect()->route('grades.index')->with('success', 'Grade created successfully.');
    }

    public function show(Grade $grade)
    {
        return Inertia::render('Grades/Show', [
            'grade' => $grade->load('categorie')
        ]);
    }

    public function edit(Grade $grade)
    {
        $categories = Categorie::all();
        return Inertia::render('Grades/Edit', [
            'grade' => $grade,
            'categories' => $categories
        ]);
    }

    public function update(UpdateGradeRequest $request, Grade $grade)
    {
        $grade->update($request->validated());
        return redirect()->route('grades.index')->with('success', 'Grade updated successfully.');
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return redirect()->route('grades.index')->with('success', 'Grade deleted successfully.');
    }
}
