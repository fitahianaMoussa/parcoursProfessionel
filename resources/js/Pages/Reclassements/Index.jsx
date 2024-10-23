import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Edit, Trash, Search, Plus, XCircle } from 'lucide-react';

export default function Index({ auth, reclassements, meta }) {
  const { delete: destroy } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedReclassement, setSelectedReclassement] = useState(null);

  // Filter reclassements based on search term
  const filteredReclassements = reclassements.filter((reclassement) =>
    reclassement.employe.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclassement.ancien_categorie?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclassement.nouvelle_categorie?.nom?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce reclassement ?')) {
      destroy(`/reclassements/${id}`);
    }
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Gestion des Reclassements
        </h2>
      }
    >
      <div className="py-4 bg-gray-200">
        <div className="container px-6 mx-auto">
          <nav className="flex" aria-label="Fil d'Ariane">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <Home className="w-4 h-4 mr-2" />
                  Tableau de bord
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Reclassements</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="py-6">
        <div className="container px-6 mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Add New Reclassement Button */}
            <div className="flex justify-end mb-4">
              <Link href="/reclassements/create" className="btn btn-primary">
                <Plus className="inline-block w-4 h-4 mr-2" />
                Ajouter un reclassement
              </Link>
            </div>

            {/* Search and entries per page selector */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-2">Afficher</span>
                <select
                  className="px-5 py-2 border rounded"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="ml-2">entrées</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Rechercher :</span>
                <div className="relative">
                  <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-2 top-1/2" />
                  <input
                    type="text"
                    className="py-2 pl-8 pr-3 border rounded"
                    placeholder="Chercher par employé ou catégorie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Reclassements table */}
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-3">Employé</th>
                  <th className="px-4 py-3">Ancienne Catégorie</th>
                  <th className="px-4 py-3">Nouvelle Catégorie</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Motif</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReclassements.slice(0, entriesPerPage).map((reclassement) => (
                  <tr key={reclassement.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{reclassement.employe.name}</td>
                    <td className="px-4 py-2">{reclassement.ancien_categorie?.nom || 'N/A'}</td>
                    <td className="px-4 py-2">{reclassement.nouvelle_categorie?.nom || 'N/A'}</td>
                    <td className="px-4 py-2">{reclassement.date_reclassement}</td>
                    <td className="px-4 py-2">{reclassement.motif}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Link href={`/reclassements/${reclassement.id}/edit`} className="flex items-center px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                          <Edit className="inline-block w-4 h-4 mr-1" />
                          Modifier
                        </Link>
                        <button
                          onClick={() => setSelectedReclassement(reclassement)}
                          className="flex items-center px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          <Trash className="inline-block w-4 h-4 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div>
                Affichage de {1} à {Math.min(entriesPerPage, filteredReclassements.length)} sur {filteredReclassements.length} entrées
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 bg-gray-200 border rounded-l">
                  <ChevronLeft size={16} />
                </button>
                {meta.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className={`px-3 py-1 border ${link.active ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    dangerouslySetInnerHTML={{
                      __html: link.label,
                    }}
                  />
                ))}
                <button className="px-3 py-1 bg-gray-200 border rounded-r">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedReclassement && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer le reclassement de <strong>{selectedReclassement.employe.name}</strong> ?</p>
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => handleDelete(selectedReclassement.id)}
              >
                <Trash className="inline-block w-4 h-4 mr-1" />
                Supprimer
              </button>
              <button
                className="btn"
                onClick={() => setSelectedReclassement(null)}
              >
                <XCircle className="inline-block w-4 h-4 mr-1" />
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </Authenticated>
  );
}
