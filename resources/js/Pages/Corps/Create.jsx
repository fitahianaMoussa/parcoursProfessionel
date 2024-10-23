import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';


export default function CorpsCreate({ auth,diplomes }) {
  const { data, setData, post, errors } = useForm({
    nom: '',
    diplome_min_requis_id: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/corps');
  };

  return (
    <Authenticated
    user={auth.user}
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Diplômes
        </h2>
    }
>
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Create New Corp</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={data.nom}
            onChange={(e) => setData('nom', e.target.value)}
            className="input input-bordered"
          />
          {errors.nom && <span className="text-red-500">{errors.nom}</span>}
        </div>

        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Diploma Required</span>
          </label>
          <select
            value={data.diplome_min_requis_id}
            onChange={(e) => setData('diplome_min_requis_id', e.target.value)}
            className="select select-bordered"
          >
            <option value="">Select Diploma</option>
            {diplomes.map((diplome) => (
              <option key={diplome.id} value={diplome.id}>
                {diplome.nom}
              </option>
            ))}
          </select>
          {errors.diplome_min_requis_id && (
            <span className="text-red-500">{errors.diplome_min_requis_id}</span>
          )}
        </div>

        <div className="mb-4 form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="textarea textarea-bordered"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Create Corp
        </button>
      </form>
    </div>
    </Authenticated>
  );
}
