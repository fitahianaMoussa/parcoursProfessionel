import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'flex items-center p-2 text-sm font-medium transition duration-200 ease-in-out rounded-lg ' +
                (active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900') +
                className
            }
        >
            {children}
        </Link>
    );
}
