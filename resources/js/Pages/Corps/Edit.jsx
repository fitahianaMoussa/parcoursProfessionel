import { useForm } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function CorpsEdit({ auth, corp, diplomes }) {
  const { data, setData, put, processing, errors } = useForm({
    nom: corp.nom || '',
    diplome_min_requis_id: corp.diplome_min_requis_id || '',
    description: corp.description || '',
  });
 console.log(corp)
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('corps.update', corp.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Corp</h2>}
    >
      <div className="container p-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Corp Name */}
            <div className="mb-4 form-control">
              <label className="label" htmlFor="nom">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="nom"
                id="nom"
                value={data.nom}
                onChange={(e) => setData('nom', e.target.value)}
                className="input input-bordered"
              />
              {errors.nom && <span className="text-error">{errors.nom}</span>}
            </div>

            {/* Diploma Minimum Required */}
            <div className="mb-4 form-control">
              <label className="label" htmlFor="diplome_min_requis_id">
                <span className="label-text">Diploma Required</span>
              </label>
              <select
                name="diplome_min_requis_id"
                id="diplome_min_requis_id"
                value={data.diplome_min_requis_id}
                onChange={(e) => setData('diplome_min_requis_id', e.target.value)}
                className="select select-bordered"
              >
                <option value="">Select a Diploma</option>
                {diplomes.map((diplome) => (
                  <option key={diplome.id} value={diplome.id}>
                    {diplome.nom}
                  </option>
                ))}
              </select>
              {errors.diplome_min_requis_id && (
                <span className="text-error">{errors.diplome_min_requis_id}</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-4 form-control">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="textarea textarea-bordered"
              />
              {errors.description && <span className="text-error">{errors.description}</span>}
            </div>

            {/* Submit Button */}
            <div className="mt-6 form-control">
              <button type="submit" className="btn btn-primary" disabled={processing}>
                {processing ? 'Updating...' : 'Update Corp'}
              </button>
            </div>
          </form>

          <div className="mt-4">
            <Link href={route('corps.index')} className="btn btn-secondary">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
