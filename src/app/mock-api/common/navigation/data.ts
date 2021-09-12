/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    
    {
        id: 'card.management',
        title: 'Card management',
        subtitle: 'Card management application',
        type: 'aside',
        icon: 'mat_outline:card_membership',
        children: [
            {
                id: 'card.management.card',
                title: 'Cards',
                type: 'basic',
                icon: 'heroicons_outline:duplicate',
                link: '/file-manager/cards',
            },
        ],
    },
    {
        id: 'user.management',
        title: 'Card Funding',
        subtitle: 'Card management application',
        type: 'aside',
        icon: 'heroicons_outline:cash',
        children: [
            {
                id: 'user.management.users',
                title: 'Fund Requests',
                type: 'basic',
                icon: 'heroicons_outline:user-group',
                link: '/file-manager/funding',
            },
            {
                id: 'user.management.roles',
                title: 'Defund Requests',
                type: 'basic',
                icon: 'heroicons_outline:bookmark-alt',
                link: '/file-manager/defunding',
            }            
        ],
    }, 
       
    {
        id: 'transaction.processing',
        title: 'Fidelity Card Funding',
        subtitle: 'Card management application',
        type: 'aside',
        icon: 'mat_outline:account_balance_wallet',
        children: [
            {
                id: 'transaction.processing.transaction-types',
                title: 'Master Card Funding',
                type: 'basic',
                icon: 'heroicons_outline:presentation-chart-bar',
                link: '/apps/transaction-processing',
            },
            {
                id: 'transaction.processing.transaction-limits',
                title: 'Master Card Defunding',
                type: 'basic',
                icon: 'heroicons_outline:receipt-tax',
                link: '/apps/transaction-processing/limits',
            },
        ],
    },
     {
        id: 'static.data.management',
        title: 'Settings',
        type: 'basic',
        icon: 'mat_outline:settings',
        link: '/file-manager/settings',
    },

];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
];
