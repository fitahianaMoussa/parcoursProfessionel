import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";


export default function Create({auth, corps, categories, grades, echelons, services }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        corps_id: '',
        categorie_id: '',
        grade_actuel_id: '',
        echelon_actuel_id: '',
        service_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        console.log(data)
        e.preventDefault();
        post('/employees');
    };

    return (
        <Authenticated
        user={auth.user}
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Gestion des Employés
          </h2>
        }
      >
        <div className="container p-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Créer un Employé</h1>
            <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md bg-base-200">
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Nom</span>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleChange} 
                        className={`input input-bordered ${errors.name ? 'input-error' : ''}`} 
                        required 
                    />
                    {errors.name && <p className="text-error">{errors.name}</p>}
                </div>
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        value={data.email} 
                        onChange={handleChange} 
                        className={`input input-bordered ${errors.email ? 'input-error' : ''}`} 
                        required 
                    />
                    {errors.email && <p className="text-error">{errors.email}</p>}
                </div>
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Corps</span>
                    </label>
                    <select 
                        name="corps_id" 
                        value={data.corps_id} 
                        onChange={handleChange} 
                        className={`select select-bordered ${errors.corps_id ? 'input-error' : ''}`}
                    >
                        <option value="">Sélectionner un corps</option>
                        {corps.map(cor => (
                            <option key={cor.id} value={cor.id}>{cor.nom}</option>
                        ))}
                    </select>
                    {errors.corps_id && <p className="text-error">{errors.corps_id}</p>}
                </div>
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Catégorie</span>
                    </label>
                    <select 
                        name="categorie_id" 
                        value={data.categorie_id} 
                        onChange={handleChange} 
                        className={`select select-bordered ${errors.categorie_id ? 'input-error' : ''}`}
                    >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nom}</option>
                        ))}
                    </select>
                    {errors.categorie_id && <p className="text-error">{errors.categorie_id}</p>}
                </div>
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Grade Actuel</span>
                    </label>
                    <select 
                        name="grade_actuel_id" 
                        value={data.grade_actuel_id} 
                        onChange={handleChange} 
                        className={`select select-bordered ${errors.grade_actuel_id ? 'input-error' : ''}`}
                    >
                        <option value="">Sélectionner un grade</option>
                        {grades.map(grade => (
                            <option key={grade.id} value={grade.id}>{grade.nom}</option>
                        ))}
                    </select>
                    {errors.grade_actuel_id && <p className="text-error">{errors.grade_actuel_id}</p>}
                </div>
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Échelon Actuel</span>
                    </label>
                    <select 
                        name="echelon_actuel_id" 
                        value={data.echelon_actuel_id} 
                        onChange={handleChange} 
                        className={`select select-bordered ${errors.echelon_actuel_id ? 'input-error' : ''}`}
                    >
                        <option value="">Sélectionner un échelon</option>
                        {echelons.map(echelon => (
                            <option key={echelon.id} value={echelon.id}>{echelon.number}</option>
                        ))}
                    </select>
                    {errors.echelon_actuel_id && <p className="text-error">{errors.echelon_actuel_id}</p>}
                </div>
                <div className="mb-4 form-control">
                    <label className="label">
                        <span className="label-text">Service</span>
                    </label>
                    <select 
                        name="service_id" 
                        value={data.service_id} 
                        onChange={handleChange} 
                        className={`select select-bordered ${errors.service_id ? 'input-error' : ''}`}
                    >
                        <option value="">Sélectionner un service</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.nom}</option>
                        ))}
                    </select>
                    {errors.service_id && <p className="text-error">{errors.service_id}</p>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={processing}>Créer</button>
            </form>
        </div>
        </Authenticated>
    );
}
