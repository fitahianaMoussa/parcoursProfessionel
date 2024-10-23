import React from "react";
import { useForm } from "@inertiajs/react";
import { Plus, GraduationCap } from "lucide-react";

const Create = ({ auth, onClose }) => {
    const { data, setData, post } = useForm({
        nom: "",
        niveau: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("diplomes.store"), { onSuccess: onClose });
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                    <GraduationCap className="w-5 h-5" />
                    Nouveau diplôme
                </h3>
                <form onSubmit={submit} className="mt-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Nom du diplôme</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Entrez le nom du diplôme"
                            value={data.nom}
                            onChange={(e) => setData("nom", e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Niveau</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Entrez le niveau"
                            value={data.niveau}
                            onChange={(e) => setData("niveau", e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn">
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Plus className="w-4 h-4 mr-2" />
                            Créer
                        </button>
                    </div>
                </form>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
};

export default Create;