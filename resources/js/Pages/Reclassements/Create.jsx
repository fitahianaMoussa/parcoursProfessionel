import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Create({ auth, categories, employees }) {
  const { data, setData, post, errors } = useForm({
    employe_id: '',
    ancienne_categorie_id: '',
    nouvelle_categorie_id: '',
    date_reclassement: '',
    motif: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/reclassements');
  };

  return (
    <Authenticated user={auth.user}>
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Créer un Nouveau Reclassement</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employé</label>
            <select
              value={data.employe_id}
              onChange={(e) => setData('employe_id', e.target.value)}
              className={`select select-bordered w-full max-w-xs ${errors.employe_id ? 'border-red-500' : ''}`}
            >
              <option value="">Sélectionner un Employé</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            {errors.employe_id && <span className="text-red-500">{errors.employe_id}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ancienne Catégorie</label>
            <select
              value={data.ancienne_categorie_id}
              onChange={(e) => setData('ancienne_categorie_id', e.target.value)}
              className={`select select-bordered w-full max-w-xs ${errors.ancienne_categorie_id ? 'border-red-500' : ''}`}
            >
              <option value="">Sélectionner une Ancienne Catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
            {errors.ancienne_categorie_id && <span className="text-red-500">{errors.ancienne_categorie_id}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nouvelle Catégorie</label>
            <select
              value={data.nouvelle_categorie_id}
              onChange={(e) => setData('nouvelle_categorie_id', e.target.value)}
              className={`select select-bordered w-full max-w-xs ${errors.nouvelle_categorie_id ? 'border-red-500' : ''}`}
            >
              <option value="">Sélectionner une Nouvelle Catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
            {errors.nouvelle_categorie_id && <span className="text-red-500">{errors.nouvelle_categorie_id}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date de Reclassement</label>
            <input
              type="date"
              value={data.date_reclassement}
              onChange={(e) => setData('date_reclassement', e.target.value)}
              className={`input input-bordered w-full max-w-xs ${errors.date_reclassement ? 'border-red-500' : ''}`}
            />
            {errors.date_reclassement && <span className="text-red-500">{errors.date_reclassement}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Motif</label>
            <textarea
              value={data.motif}
              onChange={(e) => setData('motif', e.target.value)}
              className={`textarea textarea-bordered w-full max-w-xs ${errors.motif ? 'border-red-500' : ''}`}
            />
            {errors.motif && <span className="text-red-500">{errors.motif}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Créer</button>
        </form>
      </div>
    </Authenticated>
  );
}
