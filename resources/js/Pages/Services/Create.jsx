import React from 'react';
import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Create = ({ auth, corps, users }) => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        corps_id: '',
        responsable_id: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('services.store'));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Services
                </h2>
            }
        >
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">Créer un Service</h1>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            className="w-full max-w-xs input input-bordered"
                        />
                        {errors.nom && <div className="text-red-500">{errors.nom}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Corps</label>
                        <select
                            value={data.corps_id}
                            onChange={(e) => setData('corps_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Corps</option>
                            {corps.map((corp) => (
                                <option key={corp.id} value={corp.id}>
                                    {corp.nom}
                                </option>
                            ))}
                        </select>
                        {errors.corps_id && <div className="text-red-500">{errors.corps_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Responsable</label>
                        <select
                            value={data.responsable_id}
                            onChange={(e) => setData('responsable_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Responsable</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.responsable_id && <div className="text-red-500">{errors.responsable_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full max-w-xs textarea textarea-bordered"
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="btn btn-primary">Créer</button>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
