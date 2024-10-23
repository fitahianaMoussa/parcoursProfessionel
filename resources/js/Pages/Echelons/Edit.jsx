import Authenticated from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

export default function EditEchelon({ auth, grades, echelon }) {
  const { data, setData, put, errors } = useForm({
    grade_id: echelon.grade_id || '',
    numero: echelon.numero || '',
    duree_minimale_avancement: echelon.duree_minimale_avancement || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/echelons/${echelon.id}`); 
  };

  useEffect(() => {
    setData({
      grade_id: echelon.grade_id,
      numero: echelon.numero,
      duree_minimale_avancement: echelon.duree_minimale_avancement,
    });
  }, [echelon]); 

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Edit Echelon
        </h2>
      }
    >
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Edit Echelon</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 form-control">
            <label className="label">
              <span className="label-text">Grade</span>
            </label>
            <select
              value={data.grade_id}
              onChange={(e) => setData('grade_id', e.target.value)}
              className={`select select-bordered ${errors.grade_id ? 'border-red-500' : ''}`} // Highlight if there's an error
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.nom}
                </option>
              ))}
            </select>
            {errors.grade_id && (
              <span className="text-red-500">{errors.grade_id}</span>
            )}
          </div>

          <div className="mb-4 form-control">
            <label className="label">
              <span className="label-text">Number</span>
            </label>
            <input
              type="number"
              value={data.numero}
              onChange={(e) => setData('numero', e.target.value)}
              className={`input input-bordered ${errors.numero ? 'border-red-500' : ''}`} // Highlight if there's an error
            />
            {errors.numero && <span className="text-red-500">{errors.numero}</span>}
          </div>

          <div className="mb-4 form-control">
            <label className="label">
              <span className="label-text">Minimum Advancement Time (years)</span>
            </label>
            <input
              type="number"
              value={data.duree_minimale_avancement}
              onChange={(e) => setData('duree_minimale_avancement', e.target.value)}
              className={`input input-bordered ${errors.duree_minimale_avancement ? 'border-red-500' : ''}`} // Highlight if there's an error
            />
            {errors.duree_minimale_avancement && (
              <span className="text-red-500">{errors.duree_minimale_avancement}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Update Echelon
          </button>
        </form>
      </div>
    </Authenticated>
  );
}
