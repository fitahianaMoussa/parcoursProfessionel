import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Home, User, Settings, LogOut, Menu, Bell, Search, Wallet, TrendingUp, Users, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="p-4 bg-white rounded-lg shadow">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <Icon className="w-5 h-5 text-indigo-500" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs text-gray-500">
      {trend > 0 ? '+' : ''}{trend}% from last month
    </p>
  </div>
);
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>}
        >
            <Head title="Dashboard" />
                    <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend={20.1} />
                        <StatCard title="Subscriptions" value="+2350" icon={Users} trend={180.1} />
                        <StatCard title="Sales" value="+12,234" icon={Wallet} trend={19} />
                        <StatCard title="Active Now" value="+573" icon={TrendingUp} trend={201} />
                    </div>
                    <div className="grid gap-6 mb-8 md:grid-cols-2">
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="mb-4 text-lg font-semibold">Overview</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="uv" fill="#8884d8" />
                                    <Bar dataKey="pv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow">
                            <h2 className="mb-4 text-lg font-semibold">Sales</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
        </AuthenticatedLayout>
    );
}
