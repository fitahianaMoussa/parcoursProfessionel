import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Home, GraduationCap, Folder, Users, TrendingUp, BarChart, ArrowUpCircle, Wallet, Building, FileText, LogOut, Menu, Bell, Search, UsersIcon } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';


export default function Authenticated({ user, header, children }) {
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={showingSidebar} onChange={() => setShowingSidebar(!showingSidebar)} />
            <div className="flex flex-col drawer-content">
                {/* Navbar */}
                <div className="w-full bg-white shadow-sm navbar">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                            <Menu className="inline-block w-6 h-6 stroke-current" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <div className="flex items-center">
                            <Search className="w-5 h-5 mr-2 text-gray-500" />
                            <input type="text" placeholder="Search..." className="w-full max-w-xs input input-ghost" />
                        </div>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-ghost btn-circle">
                            <Bell className="w-5 h-5" />
                        </button>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}
                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-grow p-6 bg-gray-100">
                    {header && (
                        <header className="mb-6 ">
                            <div className="mb-6 text-2xl font-semibold">{header}</div>
                        </header>
                    )}
                    {children}
                </main>
            </div>
            
            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="w-64 h-full p-4 bg-white menu text-base-content">
                    <li className="mb-6">
                        <Link href="/" className="flex items-center">
                            <ApplicationLogo className="block w-auto text-indigo-600 fill-current h-9" />
                            <span className="ml-2 text-xl font-semibold text-gray-800">Gestion de carrière</span>
                        </Link>
                    </li>
                    <li>
                        <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                            <Home className="w-5 h-5 mr-2" /> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('diplomes.index')} active={route().current('diplomes.index')}>
                            <GraduationCap className="w-5 h-5 mr-2" /> Diplômes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('categories.index')} active={route().current('categories.index')}>
                            <Folder className="w-5 h-5 mr-2" /> Catégories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('corps.index')} active={route().current('corps.index')}>
                            <Users className="w-5 h-5 mr-2" /> Corps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('grades.index')} active={route().current('grades.index')}>
                            <TrendingUp className="w-5 h-5 mr-2" /> Grades
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('echelons.index')} active={route().current('echelons.index')}>
                            <BarChart className="w-5 h-5 mr-2" /> Echelons
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('reclassements.index')} active={route().current('reclassements.index')}>
                            <ArrowUpCircle className="w-5 h-5 mr-2" /> Reclassements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('avancements.index')} active={route().current('avancements.index')}>
                            <Wallet className="w-5 h-5 mr-2" /> Avancements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('services.index')} active={route().current('services.index')}>
                            <Building className="w-5 h-5 mr-2" /> Services
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('contrats.index')} active={route().current('contrats.index')}>
                            <FileText className="w-5 h-5 mr-2" /> Contrats
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href={route('employees.index')} active={route().current('employees.index')}>
                            <UsersIcon className="w-5 h-5 mr-2" /> Employées
                        </NavLink>
                    </li>
                    <li>
                        <Link href={route('logout')} method="post" as="button" className="flex items-center py-2 text-gray-600 hover:bg-gray-100">
                            <LogOut className="w-5 h-5 mr-2" /> Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}