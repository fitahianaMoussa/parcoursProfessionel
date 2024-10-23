<?php

namespace App\Http\Controllers;

use App\Models\User;  
use App\Models\Categorie; 
use App\Models\Corp;
use App\Models\Grade;
use App\Models\Echelon; 
use App\Models\Service; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
      
        $employees = User::with(['corps', 'categorie', 'gradeActuel', 'echelonActuel', 'service'])
            ->when($request->input('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%") 
                    ->orWhereHas('corps', function($query) use ($search) {
                        $query->where('nom', 'like', "%{$search}%");
                    })
                    ->orWhereHas('categorie', function($query) use ($search) {
                        $query->where('nom', 'like', "%{$search}%"); 
                    });
            })
            ->paginate(10);
    
       
        $links = collect([
            [
                'label' => '&laquo; Previous',
                'url' => $employees->previousPageUrl(),
                'active' => $employees->onFirstPage(),
            ],
            ...collect($employees->getUrlRange(1, $employees->lastPage()))->map(function ($url, $page) use ($employees) {
                return [
                    'label' => $page,
                    'url' => $url,
                    'active' => $employees->currentPage() === $page,
                ];
            })->toArray(),
            [
                'label' => 'Next &raquo;',
                'url' => $employees->nextPageUrl(),
                'active' => $employees->hasMorePages(),
            ],
        ]);
    
      $echelons = Echelon::all();
      $categories = Categorie::all();
        return Inertia::render('Employees/Index', [
            'employees' => $employees->items(), 
            'meta' => [
                'links' => $links, 
                'current_page' => $employees->currentPage(),
                'last_page' => $employees->lastPage(),
                'total' => $employees->total(),
                'per_page' => $employees->perPage(),
            ],
            'echelons' =>$echelons,
            'categories' =>$categories
        ]);
    }
    

    public function create()
    {
       
        $corps = Corp::all();
        $categories = Categorie::all();
        $grades = Grade::all();
        $echelons = Echelon::all();
        $services = Service::all();

        return Inertia::render('Employees/Create', [
            'corps' => $corps,
            'categories' => $categories,
            'grades' => $grades,
            'echelons' => $echelons,
            'services' => $services,
        ]);
    }

    public function store(Request $request)
{
     $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'corps_id' => 'nullable|exists:corps,id',
        'categorie_id' => 'nullable|exists:categories,id',
        'grade_actuel_id' => 'nullable|exists:grades,id',
        'echelon_actuel_id' => 'nullable|exists:echelons,id',
        'service_id' => 'nullable|exists:services,id',
    ]);

    
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt('password'), 
        'role' => 'employe', 
        'corps_id' => $request->corps_id,
        'categorie_id' => $request->categorie_id,
        'grade_actuel_id' => $request->grade_actuel_id,
        'echelon_actuel_id' => $request->echelon_actuel_id,
        'service_id' => $request->service_id,
    ]);

    // dd($user); // Pour déboguer

    return redirect()->route('employees.index')->with('success', 'Employé créé avec succès.');
}


    public function edit(User $employee)
    {
   
        $corps = Corp::all();
        $categories = Categorie::all();
        $grades = Grade::all();
        $echelons = Echelon::all();
        $services = Service::all();

        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'corps' => $corps,
            'categories' => $categories,
            'grades' => $grades,
            'echelons' => $echelons,
            'services' => $services,
        ]);
    }

    public function update(Request $request, User $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $employee->id,
            'corps_id' => 'nullable|exists:corps,id',
            'categorie_id' => 'nullable|exists:categories,id',
            'grade_actuel_id' => 'nullable|exists:grades,id',
            'echelon_actuel_id' => 'nullable|exists:echelons,id',
            'service_id' => 'nullable|exists:services,id',
        ]);

        $employee->update($request->only('name', 'email', 'corps_id', 'categorie_id', 'grade_actuel_id', 'echelon_actuel_id', 'service_id'));

        return redirect()->route('employees.index')->with('success', 'Employé mis à jour avec succès.');
    }

    public function destroy(User $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index')->with('success', 'Employé supprimé avec succès.');
    }
}
