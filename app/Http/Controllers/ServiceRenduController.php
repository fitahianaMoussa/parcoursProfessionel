<?php

namespace App\Http\Controllers;

use App\Models\ServiceRendu;
use App\Models\Arrete;
use App\Models\Poste;
use App\Models\User;
use App\Models\Service;
use App\Models\Corps;
use App\Models\Categorie;
use App\Models\Corp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceRenduController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all Service Rendus with their relationships
        $serviceRendus = ServiceRendu::with(['user', 'poste', 'service', 'corps', 'categorie'])->get();
        $users = User::where('role','employe')->get();;
        $services = Service::all();
        $corps = Corp::all();
        $categories = Categorie::all();
        return Inertia::render('ServiceRendus/Index', [
            'serviceRendus' => $serviceRendus,
            'users' => $users,
            'services' => $services,
            'corps' => $corps,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      
        $users = User::where('role','employe')->get();;
        $services = Service::all();
        $corps = Corp::all();
        $categories = Categorie::all();

        return Inertia::render('ServiceRendus/Create', [
            'users' => $users,
            'services' => $services,
            'corps' => $corps,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'poste_nom' => 'required|string|max:255',
            'poste_description' => 'nullable|string',
            'type' => 'required|string|max:255',
            'num_arrete' => 'required|string|max:255',
            'date_arrete' => 'required|date',
            'type_avancement' => 'nullable|string|max:255',
            'type_reclassement' => 'nullable|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'nullable|date|after_or_equal:date_debut',
        ]);

       
        $arret = Arrete::create([
            'type' => $request->input('type'),
            'num_arrete' => $request->input('num_arrete'),
            'date_arrete' => $request->input('date_arrete'),
            'type_avancement' => $request->input('type_avancement'),
            'type_reclassement' => $request->input('type_reclassement'),
        ]);

       
        $poste = Poste::create([
            'nom' => $request->input('poste_nom'),
            'description' => $request->input('poste_description'),
            'service_id' => $request->input('service_id'), 
        ]);

     
        ServiceRendu::create([
            'user_id' => $request->input('user_id'),
            'poste_id' => $poste->id,
            'service_id' => $request->input('service_id'),
            'corps_id' => $request->input('corps_id'),
            'categorie_id' => $request->input('categorie_id'),
            'arrete_id' => $arret->id,
            'date_debut' => $request->input('date_debut'),
            'date_fin' => $request->input('date_fin'),
        ]);

        return redirect()->route('serviceRendu.index')->with('success', 'Service rendu created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceRendu $serviceRendu)
    {
        // Fetch necessary data for dropdowns
        $users = User::where('role','employe')->get();
        $postes = Poste::all();
        $services = Service::all();
        $corps = Corp::all();
        $categories = Categorie::all();

        return Inertia::render('ServiceRendus/Edit', [
            'serviceRendu' => $serviceRendu,
            'users' => $users,
            'postes' => $postes,
            'services' => $services,
            'corps' => $corps,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ServiceRendu $serviceRendu)
    {
        // Validate request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'poste_nom' => 'required|string|max:255',
            'poste_description' => 'nullable|string',
            'type' => 'required|string|max:255',
            'num_arrete' => 'required|string|max:255',
            'date_arrete' => 'required|date',
            'type_avancement' => 'nullable|string|max:255',
            'type_reclassement' => 'nullable|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'nullable|date|after_or_equal:date_debut',
        ]);

        // Update the associated Arrete
        $arret = Arrete::find($serviceRendu->arrete_id);
        $arret->update([
            'type' => $request->input('type'),
            'num_arrete' => $request->input('num_arrete'),
            'date_arrete' => $request->input('date_arrete'),
            'type_avancement' => $request->input('type_avancement'),
            'type_reclassement' => $request->input('type_reclassement'),
        ]);

        // Update the associated Poste
        $poste = Poste::find($serviceRendu->poste_id);
        $poste->update([
            'nom' => $request->input('poste_nom'),
            'description' => $request->input('poste_description'),
            'service_id' => $request->input('service_id'),
        ]);

        // Update the Service Rendu
        $serviceRendu->update([
            'user_id' => $request->input('user_id'),
            'service_id' => $request->input('service_id'),
            'corps_id' => $request->input('corps_id'),
            'categorie_id' => $request->input('categorie_id'),
            'date_debut' => $request->input('date_debut'),
            'date_fin' => $request->input('date_fin'),
        ]);

        return redirect()->route('serviceRendu.index')->with('success', 'Service rendu updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceRendu $serviceRendu)
    {
        // Delete the associated Arrete
        Arrete::destroy($serviceRendu->arrete_id);
        
        // Delete the associated Poste
        Poste::destroy($serviceRendu->poste_id);
        
        // Delete the Service Rendu
        $serviceRendu->delete();

        return redirect()->route('serviceRendu.index')->with('success', 'Service rendu deleted successfully.');
    }
}
