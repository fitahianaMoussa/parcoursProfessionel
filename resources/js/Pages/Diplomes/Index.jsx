import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Plus, Edit, Trash, Search, XCircle, GraduationCap, Filter } from "lucide-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Create from "./Create";
import EditDiplome from "./Edit";
import Pagination from "@/Components/pagination";


const Index = ({ auth, diplomes, meta }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDiplome, setSelectedDiplome] = useState(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const filteredDiplomes = diplomes.filter(
        (diplome) =>
            diplome.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            diplome.niveau?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredDiplomes.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedDiplomes = filteredDiplomes.slice(startIndex, startIndex + entriesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
       
    };

    const handleEntriesPerPageChange = (value) => {
        setEntriesPerPage(value);
        setCurrentPage(1); 
    };

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce diplôme ?")) {
            // Delete logic here
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2" />
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Gestion des Diplômes
                    </h2>
                </div>
            }
        >
            <div className="min-h-screen py-6 bg-base-200">
                <div className="container px-6 mx-auto">
                    {/* Search and Actions Bar */}
                    <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un diplôme..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 input input-bordered"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="form-control">
                                <select
                                    value={entriesPerPage}
                                    onChange={(e) => handleEntriesPerPageChange(Number(e.target.value))}
                                    className="select select-bordered"
                                >
                                    <option value={10}>10 par page</option>
                                    <option value={25}>25 par page</option>
                                    <option value={50}>50 par page</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="gap-2 btn btn-primary"
                            >
                                <Plus className="w-5 h-5" />
                                Nouveau diplôme
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto bg-base-100 rounded-box">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Niveau</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedDiplomes.map((diplome) => (
                                    <tr key={diplome.id} className="hover">
                                        <td>{diplome.id}</td>
                                        <td>{diplome.nom}</td>
                                        <td>
                                            <div className="badge badge-neutral">{diplome.niveau}</div>
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedDiplome(diplome);
                                                        setEditModalOpen(true);
                                                    }}
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(diplome.id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredDiplomes.length > 0 && (
                        <div className="flex flex-col items-center gap-4 mt-4 md:flex-row md:justify-between">
                            <div className="text-sm text-gray-500">
                                Affichage de {startIndex + 1} à{" "}
                                {Math.min(startIndex + entriesPerPage, filteredDiplomes.length)} sur{" "}
                                {filteredDiplomes.length} entrées
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredDiplomes.length === 0 && (
                        <div className="flex flex-col items-center justify-center p-8 text-center bg-base-100 rounded-box">
                            <div className="mb-4">
                                <Filter className="w-16 h-16 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold">Aucun résultat trouvé</h3>
                            <p className="text-gray-500">
                                Aucun diplôme ne correspond à votre recherche.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <Create auth={auth} onClose={() => setCreateModalOpen(false)} />
            )}
            {isEditModalOpen && selectedDiplome && (
                <EditDiplome
                    auth={auth}
                    diplome={selectedDiplome}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </Authenticated>
    );
};

export default Index;