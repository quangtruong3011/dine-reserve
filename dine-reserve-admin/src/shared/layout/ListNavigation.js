import { Dashboard, Login, Restaurant, Settings, TableRestaurant } from '@mui/icons-material';
import React from 'react';

export const ListNavigation = [
    {
        title: 'Dashboard',
        href: '/',
        icon: <Dashboard />,
    },
    {
        title: 'Reservations',
        icon: <Restaurant />,
        navigationItems: [
            {
                title: 'All Reservations',
                href: '/reservations',
            },
            {
                title: 'Reservation Status',
                href: '/reservations/status',
            }
        ]
    },
    {
        title: 'Tables',
        icon: <TableRestaurant />,
        navigationItems: [
            {
                title: 'All Tables',
                href: '/tables',
            },
            {
                title: 'Available Tables',
                href: '/tables/available-tables',
            },
            {
                title: 'Table Layout',
                href: '/tables/table-layout',
            },
        ]
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: <Settings />
    },
    {
        title: "Logout",
        href: '/login',
        icon: <Login />
    }
];

export default ListNavigation;
