import React from 'react';
import { useForm } from '@inertiajs/react';
import { Calendar, FileText, User, Briefcase, Building2, Save, FileType, Hash, Award } from 'lucide-react';

const FormGroup = ({ label, icon: Icon, children, error, className = "" }) => (
    <div className={`form-control ${className}`}>
        <label className="label">
            <span className="flex items-center gap-2 label-text">
                {Icon && <Icon className="w-4 h-4" />}
                {label}
            </span>
        </label>
        {children}
        {error && <div className="mt-1 text-sm text-error">{error}</div>}
    </div>
);

const ServiceRenduForm = ({ serviceRendu, users, services, corps, categories, onClose }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        user_id: serviceRendu?.user_id || '',
        poste_nom: serviceRendu?.poste?.nom || '',
        poste_description: serviceRendu?.poste?.description || '',
        type: serviceRendu?.arrete?.type || '',
        num_arrete: serviceRendu?.arrete?.num_arrete || '',
        date_arrete: serviceRendu?.arrete?.date_arrete || '',
        type_avancement: serviceRendu?.arrete?.type_avancement || '',
        type_reclassement: serviceRendu?.arrete?.type_reclassement || '',
        date_debut: serviceRendu?.date_debut || '',
        date_fin: serviceRendu?.date_fin || '',
        service_id: serviceRendu?.service_id || '',
        corps_id: serviceRendu?.corps_id || '',
        categorie_id: serviceRendu?.categorie_id || '',
    });

    const handleSubmit = (e) => {
        console.log(data)
        e.preventDefault();
        if (serviceRendu) {
            put(route('serviceRendu.update', serviceRendu.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('serviceRendu.store'), {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee and Position Section */}
            <div className="p-4 space-y-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Employee & Position Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormGroup label="Employee" icon={User} error={errors.user_id}>
                        <select
                            className="w-full select select-bordered"
                            value={data.user_id}
                            onChange={(e) => setData('user_id', e.target.value)}
                            required
                        >
                            <option value="">Select Employee</option>
                            {users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    <FormGroup label="Service" icon={Building2} error={errors.service_id}>
                        <select
                            className="w-full select select-bordered"
                            value={data.service_id}
                            onChange={(e) => setData('service_id', e.target.value)}
                            required
                        >
                            <option value="">Select Service</option>
                            {services?.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    <FormGroup label="Position Name" icon={Briefcase} error={errors.poste_nom}>
                        <input
                            type="text"
                            className="w-full input input-bordered"
                            value={data.poste_nom}
                            onChange={(e) => setData('poste_nom', e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Position Description" icon={FileText} error={errors.poste_description}>
                        <textarea
                            className="w-full textarea textarea-bordered"
                            value={data.poste_description}
                            onChange={(e) => setData('poste_description', e.target.value)}
                            rows="2"
                        />
                    </FormGroup>
                </div>
            </div>

            {/* Arrete Section */}
            <div className="p-4 space-y-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Arrêté Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormGroup label="Type" icon={FileType} error={errors.type}>
                        <select
                            className="w-full select select-bordered"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="nomination">Nomination</option>
                            <option value="promotion">Promotion</option>
                            <option value="mutation">Mutation</option>
                        </select>
                    </FormGroup>

                    <FormGroup label="Numéro Arrêté" icon={Hash} error={errors.num_arrete}>
                        <input
                            type="text"
                            className="w-full input input-bordered"
                            value={data.num_arrete}
                            onChange={(e) => setData('num_arrete', e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Date Arrêté" icon={Calendar} error={errors.date_arrete}>
                        <input
                            type="date"
                            className="w-full input input-bordered"
                            value={data.date_arrete}
                            onChange={(e) => setData('date_arrete', e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Type Avancement" icon={Award} error={errors.type_avancement}>
                        <select
                            className="w-full select select-bordered"
                            value={data.type_avancement}
                            onChange={(e) => setData('type_avancement', e.target.value)}
                        >
                            <option value="">Select Type Avancement</option>
                            <option value="normal">Normal</option>
                            <option value="choix">Choix</option>
                            <option value="anciennete">Ancienneté</option>
                        </select>
                    </FormGroup>

                    <FormGroup label="Type Reclassement" icon={Award} error={errors.type_reclassement}>
                        <select
                            className="w-full select select-bordered"
                            value={data.type_reclassement}
                            onChange={(e) => setData('type_reclassement', e.target.value)}
                        >
                            <option value="">Select Type Reclassement</option>
                            <option value="formation">Formation</option>
                            <option value="concours">Concours</option>
                        </select>
                    </FormGroup>
                </div>
            </div>

            {/* Period and Classification Section */}
            <div className="p-4 space-y-4 border rounded-lg">
                <h3 className="text-lg font-semibold">Period & Classification</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormGroup label="Date Début" icon={Calendar} error={errors.date_debut}>
                        <input
                            type="date"
                            className="w-full input input-bordered"
                            value={data.date_debut}
                            onChange={(e) => setData('date_debut', e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup label="Date Fin" icon={Calendar} error={errors.date_fin}>
                        <input
                            type="date"
                            className="w-full input input-bordered"
                            value={data.date_fin}
                            onChange={(e) => setData('date_fin', e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup label="Corps" error={errors.corps_id}>
                        <select
                            className="w-full select select-bordered"
                            value={data.corps_id}
                            onChange={(e) => setData('corps_id', e.target.value)}
                            required
                        >
                            <option value="">Select Corps</option>
                            {corps?.map((corp) => (
                                <option key={corp.id} value={corp.id}>
                                    {corp.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>

                    <FormGroup label="Catégorie" error={errors.categorie_id}>
                        <select
                            className="w-full select select-bordered"
                            value={data.categorie_id}
                            onChange={(e) => setData('categorie_id', e.target.value)}
                            required
                        >
                            <option value="">Select Catégorie</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                </div>
            </div>

            <div className="modal-action">
                <button 
                    type="button" 
                    className="btn btn-ghost" 
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={processing}
                >
                    <Save className="w-4 h-4 mr-2" />
                    {processing ? 'Saving...' : (serviceRendu ? 'Update' : 'Create')}
                </button>
            </div>
        </form>
    );
};

export default ServiceRenduForm;