import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import React from 'react';

export default function Create({ auth, categories }) {
  const { data, setData, post, processing, errors } = useForm({
    nom: '',
    categorie_id: '',
    duree_minimale_avancement: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/grades');
  };

  return (
    <Authenticated user={auth.user} header={<h2>Create Grade</h2>}>
      <form onSubmit={handleSubmit} className="container max-w-2xl p-4 mx-auto">
        {/* Grade Name */}
        <div className="mb-4 form-control">
          <label className="label">Name</label>
          <input
            type="text"
            value={data.nom}
            onChange={(e) => setData('nom', e.target.value)}
            className="input input-bordered"
          />
          {errors.nom && <div className="text-error">{errors.nom}</div>}
        </div>

        {/* Category */}
        <div className="mb-4 form-control">
          <label className="label">Category</label>
          <select
            value={data.categorie_id}
            onChange={(e) => setData('categorie_id', e.target.value)}
            className="select select-bordered"
          >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
          {errors.categorie_id && <div className="text-error">{errors.categorie_id}</div>}
        </div>

        {/* Minimum Advancement Time */}
        <div className="mb-4 form-control">
          <label className="label">Minimum Advancement Time (years)</label>
          <input
            type="number"
            value={data.duree_minimale_avancement}
            onChange={(e) => setData('duree_minimale_avancement', e.target.value)}
            className="input input-bordered"
          />
          {errors.duree_minimale_avancement && <div className="text-error">{errors.duree_minimale_avancement}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={processing}>
          {processing ? 'Creating...' : 'Create Grade'}
        </button>
      </form>
    </Authenticated>
  );
}
