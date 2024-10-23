<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAvancementRequest;
use App\Http\Requests\UpdateAvancementRequest;
use App\Models\Avancement;
use App\Models\Echelon;
use App\Models\Grade; 
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AvancementController extends Controller
{
    public function index(Request $request)
    {
        
        $avancements = Avancement::with(['employe', 'ancienEchelon', 'nouveauEchelon', 'ancienGrade', 'nouveauGrade'])
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('employe', function($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('ancienEchelon', function($query) use ($search) {
                    $query->where('nom', 'like', "%{$search}%");
                })
                ->orWhereHas('nouveauEchelon', function($query) use ($search) {
                    $query->where('nom', 'like', "%{$search}%");
                });
            })
            ->paginate(10);
    
       
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $avancements->previousPageUrl(),
                'active' => $avancements->onFirstPage(),
            ],
            ...collect($avancements->getUrlRange(1, $avancements->lastPage()))->map(function ($url, $page) use ($avancements) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $avancements->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $avancements->nextPageUrl(),
                'active' => $avancements->hasMorePages(),
            ],
        ]);
    
      
        return Inertia::render('Avancements/Index', [
            'avancements' => $avancements->items(),
            'meta' => [
                'links' => $links,
                'current_page' => $avancements->currentPage(),
                'last_page' => $avancements->lastPage(),
                'total' => $avancements->total(),
                'per_page' => $avancements->perPage(),
            ],
        ]);
    }
    

    public function create()
    {
        $employes = User::all(); 
        $echelons = Echelon::all(); 
        $grades = Grade::all(); 
        
        return Inertia::render('Avancements/Create', [
            'employes' => $employes,
            'echelons' => $echelons,
            'grades' => $grades, 
        ]);
    }
    
    public function edit(Avancement $avancement)
    {
        $employes = User::all(); 
        $echelons = Echelon::all(); 
        $grades = Grade::all(); 
        
        return Inertia::render('Avancements/Edit', [
            'avancement' => $avancement,
            'employes' => $employes,
            'echelons' => $echelons,
            'grades' => $grades, 
        ]);
    }
    

    public function store(StoreAvancementRequest $request) 
    {
        //dd($request);
        Avancement::create($request->validated());

        return redirect()->route('avancements.index')->with('success', 'Avancement created successfully.');
    }

    public function update(UpdateAvancementRequest $request, Avancement $avancement)
    {
        $avancement->update($request->validated());

        return redirect()->route('avancements.index')->with('success', 'Avancement updated successfully.');
    }

    public function destroy(Avancement $avancement)
    {
        $avancement->delete();
        return redirect()->route('avancements.index')->with('success', 'Avancement deleted successfully.');
    }
}
