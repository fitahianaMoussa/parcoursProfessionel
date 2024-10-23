<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Corp;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
{
   
    $services = Service::with(['corps', 'responsable'])
        ->when($request->input('search'), function ($query, $search) {

            $query->where('nom', 'like', "%{$search}%")
                ->orWhereHas('corps', function ($query) use ($search) {
                    $query->where('nom', 'like', "%{$search}%");
                })
                ->orWhereHas('responsable', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
        })
        ->paginate(10); 

    
    $links = collect([
        [
            'label' => '&laquo; Previous',
            'url' => $services->previousPageUrl(),
            'active' => $services->onFirstPage(),
        ],
        ...collect($services->getUrlRange(1, $services->lastPage()))->map(function ($url, $page) use ($services) {
            return [
                'label' => $page,
                'url' => $url,
                'active' => $services->currentPage() === $page,
            ];
        })->toArray(),
        [
            'label' => 'Next &raquo;',
            'url' => $services->nextPageUrl(),
            'active' => $services->hasMorePages(),
        ],
    ]);

   
    return Inertia::render('Services/Index', [
        'services' => $services->items(), 
        'meta' => [
            'links' => $links,
            'current_page' => $services->currentPage(),
            'last_page' => $services->lastPage(),
            'total' => $services->total(),
            'per_page' => $services->perPage(),
        ],
    ]);
}


    public function create()
{
    $corps = Corp::all(); 
    $users = User::all(); 
    return Inertia::render('Services/Create', [
        'corps' => $corps,
        'users' => $users,
    ]);
}

public function edit(Service $service)
{
    $corps = Corp::all(); 
    $users = User::all(); 
    return Inertia::render('Services/Edit', [
        'service' => $service,
        'corps' => $corps,
        'users' => $users,
    ]);
}

    public function store(StoreServiceRequest $request)
    {
        Service::create($request->validated());
        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }


    public function update(UpdateServiceRequest $request, Service $service)
    {
        $service->update($request->validated());
        return redirect()->route('services.index')->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
