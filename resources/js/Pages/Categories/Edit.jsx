import React from "react";
import { useForm } from "@inertiajs/react";
import { Edit } from "lucide-react";

const EditCategory = ({  categorie, diplomes, onClose }) => {
    const { data, setData, put } = useForm({
        nom: categorie.nom,
        diplome_min_requis_id: categorie.diplome_min_requis_id,
        description: categorie.description,
    });
    console.log(categorie,diplomes)

    const submit = (e) => {
        e.preventDefault();
        put(route("categories.update", categorie.id), { onSuccess: onClose });
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                    <Edit className="w-5 h-5" />
                    Modifier la catégorie
                </h3>
                <form onSubmit={submit} className="mt-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nom de la catégorie</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Entrez le nom de la catégorie"
                            value={data.nom}
                            onChange={(e) => setData("nom", e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Diplôme minimum requis</span>
                        </label>
                        <select
                            value={data.diplome_min_requis_id}
                            onChange={(e) => setData("diplome_min_requis_id", e.target.value)}
                            className="select select-bordered"
                            required
                        >
                            <option value="">Sélectionnez un diplôme</option>
                            {diplomes.map((diplome) => (
                                <option key={diplome.id} value={diplome.id}>
                                    {diplome.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            placeholder="Entrez une description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            className="textarea textarea-bordered"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Edit className="w-4 h-4 mr-2" />
                            Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};

export default EditCategory;
