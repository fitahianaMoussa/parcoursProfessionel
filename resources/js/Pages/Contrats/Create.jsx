import React from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Create = ({ auth, services, employes }) => {
    const { data, setData, post, processing, errors } = useForm({
        employe_id: '',
        type: '',
        date_debut: '',
        date_fin: '',
        nouveau_service_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contrats.store'));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contrats
                </h2>
            }
        >
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">Créer un Contrat</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employé</label>
                        <select
                            value={data.employe_id}
                            onChange={(e) => setData('employe_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Employé</option>
                            {employes.map((employe) => (
                                <option key={employe.id} value={employe.id}>
                                    {employe.name} {/* Changer ce champ pour le champ approprié */}
                                </option>
                            ))}
                        </select>
                        {errors.employe_id && <div className="text-red-500">{errors.employe_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <input
                            type="text"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="w-full max-w-xs input input-bordered"
                        />
                        {errors.type && <div className="text-red-500">{errors.type}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date de Début</label>
                        <input
                            type="date"
                            value={data.date_debut}
                            onChange={(e) => setData('date_debut', e.target.value)}
                            className="w-full max-w-xs input input-bordered"
                        />
                        {errors.date_debut && <div className="text-red-500">{errors.date_debut}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date de Fin</label>
                        <input
                            type="date"
                            value={data.date_fin}
                            onChange={(e) => setData('date_fin', e.target.value)}
                            className="w-full max-w-xs input input-bordered"
                        />
                        {errors.date_fin && <div className="text-red-500">{errors.date_fin}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nouveau Service</label>
                        <select
                            value={data.nouveau_service_id}
                            onChange={(e) => setData('nouveau_service_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Nouveau Service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.nom}
                                </option>
                            ))}
                        </select>
                        {errors.nouveau_service_id && <div className="text-red-500">{errors.nouveau_service_id}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="btn btn-primary">Créer</button>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
