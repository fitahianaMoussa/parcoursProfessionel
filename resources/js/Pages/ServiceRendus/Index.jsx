import React, { useState } from 'react';
import { Calendar, Edit2, Plus, User, Briefcase, Building2, CalendarRange, GraduationCap } from 'lucide-react';
import ServiceRenduForm from './ServiceRenduForm';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Index = ({auth, serviceRendus, users, services, corps, categories }) => {
    console.log(services)
    const [modalOpen, setModalOpen] = useState(false);
    const [currentRendu, setCurrentRendu] = useState(null);

    const handleEdit = (serviceRendu) => {
        setCurrentRendu(serviceRendu);
        setModalOpen(true);
    };
    
    const handleClose = () => {
        setCurrentRendu(null);
        setModalOpen(false);
    };
    
    const handleCreate = () => {
        setCurrentRendu(null);
        setModalOpen(true);
    };

    return (
        <Authenticated
        user={auth.user}
        header={
            <div className="flex items-center">
                <GraduationCap className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestion des services rendus
                </h2>
            </div>
        }
    >
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Service Rendus</h1>
                <button 
                    onClick={handleCreate}
                    className="btn btn-primary"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Service Rendu
                </button>
            </div>

            <div className="shadow-xl card bg-base-100">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Poste</th>
                                <th>Service</th>
                                <th>Date Début</th>
                                <th>Date Fin</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceRendus.map((rendu) => (
                                <tr key={rendu.id} className="hover">
                                    <td className="font-medium">{rendu.id}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                                <User className="w-4 h-4 text-primary" />
                                            </div>
                                            <span>{rendu.user.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
                                                <Briefcase className="w-4 h-4 text-secondary" />
                                            </div>
                                            <span>{rendu.poste.nom}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                                                <Building2 className="w-4 h-4 text-accent" />
                                            </div>
                                            <span>{rendu.service.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-info/10">
                                                <Calendar className="w-4 h-4 text-info" />
                                            </div>
                                            <span>{rendu.date_debut}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning/10">
                                                <CalendarRange className="w-4 h-4 text-warning" />
                                            </div>
                                            <span>{rendu.date_fin}</span>
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => handleEdit(rendu)}
                                            className="btn btn-ghost btn-sm"
                                        >
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalOpen && (
                <div className="modal modal-open">
                    <div className="max-w-4xl modal-box">
                        <h3 className="mb-4 text-lg font-bold">
                            {currentRendu ? 'Edit Service Rendu' : 'Create Service Rendu'}
                        </h3>
                        <ServiceRenduForm
                            serviceRendu={currentRendu}
                            users={users}
                            services={services}
                            corps={corps}
                            categories={categories}
                            onClose={handleClose}
                        />
                    </div>
                    <div className="modal-backdrop" onClick={handleClose}></div>
                </div>
            )}
        </div>
        </Authenticated>
    );
};

export default Index;