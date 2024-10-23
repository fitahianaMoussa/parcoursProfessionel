import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Edit, Trash, Search, Plus, XCircle } from 'lucide-react';

export default function EmployeesIndex({ auth, employees, meta = { links: [] },echelons,categories}){
  console.log(employees);
  const { delete: destroy } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEchelon, setSelectedEchelon] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

 
  const filteredEmployees = employees.filter(employee => {
    return (
      (employee.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedEchelon ? employee.echelon === selectedEchelon : true) &&
      (selectedCategory ? employee.category === selectedCategory : true)
    );
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      destroy(`/employees/${id}`);
    }
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
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Employés</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="py-6">
        <div className="container px-6 mx-auto">
          <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Add New Employee Button */}
            <div className="flex justify-end mb-4">
              <Link href={route('employees.create')} className="btn btn-primary">
                <Plus className="inline-block w-4 h-4 mr-2" />
                Ajouter un employé
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
                    placeholder="Chercher par nom, prénom ou email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Echelon and Category Selectors */}
              <div className="flex items-center">
                <span className="mr-2">Échelon :</span>
                <select
                  className="px-3 py-2 border rounded"
                  value={selectedEchelon}
                  onChange={(e) => setSelectedEchelon(e.target.value)}
                >
                  <option value="">Tous</option>
                  {echelons.map((echelon) => (
                    <option key={echelon.id} value={echelon.name}>{echelon.name}</option>
                  ))}
                </select>

                <span className="ml-4 mr-2">Catégorie :</span>
                <select
                  className="px-3 py-2 border rounded"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Toutes</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Employees table */}
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Prénom</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Échelon</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.slice(0, entriesPerPage).map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.corps?.nom}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                    <td className="px-4 py-2">{employee.echelon?.numero}</td>
                    <td className="px-4 py-2">{employee.categorie?.nom} - {employee.service?.nom}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Link href={`/employees/${employee.id}/edit`} className="flex items-center px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                          <Edit className="inline-block w-4 h-4 mr-1" />
                          Modifier
                        </Link>
                        <button
                          onClick={() => setSelectedEmployee(employee)}
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
                Affichage de {1} à {Math.min(entriesPerPage, filteredEmployees.length)} sur {filteredEmployees.length} entrées
              </div>
              <div className="flex space-x-1">
                <button className="px-3 py-1 bg-gray-200 border rounded-l">
                  <ChevronLeft size={16} />
                </button>
                {meta.links.map((link, index) => (
                  <button key={index} className={`px-3 py-1 border ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>
                    {link.label}
                  </button>
                ))}
                <button className="px-3 py-1 bg-gray-200 border rounded-r">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Confirmation Modal for Delete */}
            {selectedEmployee && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="p-5 bg-white rounded">
                  <h3 className="text-lg font-semibold">Confirmation de la suppression</h3>
                  <p>Êtes-vous sûr de vouloir supprimer l'employé {selectedEmployee.nom} {selectedEmployee.prenom} ?</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDelete(selectedEmployee.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => setSelectedEmployee(null)}
                      className="px-4 py-2 ml-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
