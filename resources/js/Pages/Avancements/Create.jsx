import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

const Create = ({ auth, employes, echelons, grades }) => {
    const { data, setData, post, processing, errors } = useForm({
        employe_id: '',
        ancien_echelon_id: '',
        nouvel_echelon_id: '',
        ancien_grade_id: '',
        nouveau_grade_id: '',
        date_avancement: '',
        motif: '',
    });

    const submit = (e) => {
        console.log(data)
        e.preventDefault();
        post(route('avancements.store'));
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Avancements
                </h2>
            }
        >
            <div className="container p-4 mx-auto">
                <h1 className="mb-4 text-2xl font-bold">Créer un Avancement</h1>
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
                                    {employe.name}
                                </option>
                            ))}
                        </select>
                        {errors.employe_id && <div className="text-red-500">{errors.employe_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ancien Grade</label>
                        <select
                            value={data.ancien_grade_id}
                            onChange={(e) => setData('ancien_grade_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Ancien Grade</option>
                            {grades.map((grade) => (
                                <option key={grade.id} value={grade.id}>
                                    {grade.nom}
                                </option>
                            ))}
                        </select>
                        {errors.ancien_grade_id && <div className="text-red-500">{errors.ancien_grade_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nouveau Grade</label>
                        <select
                            value={data.nouveau_grade_id}
                            onChange={(e) => setData('nouveau_grade_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Nouveau Grade</option>
                            {grades.map((grade) => (
                                <option key={grade.id} value={grade.id}>
                                    {grade.nom}
                                </option>
                            ))}
                        </select>
                        {errors.nouveau_grade_id && <div className="text-red-500">{errors.nouveau_grade_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ancien Échelon</label>
                        <select
                            value={data.ancien_echelon_id}
                            onChange={(e) => setData('ancien_echelon_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Ancien Échelon</option>
                            {echelons.map((echelon) => (
                                <option key={echelon.id} value={echelon.id}>
                                    {echelon?.numero}
                                </option>
                            ))}
                        </select>
                        {errors.ancien_echelon_id && <div className="text-red-500">{errors.ancien_echelon_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nouveau Échelon</label>
                        <select
                            value={data.nouvel_echelon_id}
                            onChange={(e) => setData('nouvel_echelon_id', e.target.value)}
                            className="w-full max-w-xs select select-bordered"
                        >
                            <option value="">Sélectionner un Nouveau Échelon</option>
                            {echelons.map((echelon) => (
                                <option key={echelon.id} value={echelon.id}>
                                    {echelon?.numero}
                                </option>
                            ))}
                        </select>
                        {errors.nouvel_echelon_id && <div className="text-red-500">{errors.nouvel_echelon_id}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date d'Avancement</label>
                        <input
                            type="date"
                            value={data.date_avancement}
                            onChange={(e) => setData('date_avancement', e.target.value)}
                            className="w-full max-w-xs input input-bordered"
                        />
                        {errors.date_avancement && <div className="text-red-500">{errors.date_avancement}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Motif</label>
                        <input
                            type="text"
                            value={data.motif}
                            onChange={(e) => setData('motif', e.target.value)}
                            className="w-full max-w-xs input input-bordered"
                        />
                        {errors.motif && <div className="text-red-500">{errors.motif}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="btn btn-primary">Créer</button>
                </form>
            </div>
        </Authenticated>
    );
};

export default Create;
