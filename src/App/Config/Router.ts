import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('App/Layout/Default.vue'),
        children: [
            {
                path: '',
                component: () => import('App/Page/Home.vue'),
            },
            {
                path: '/settings',
                component: () => import('App/Page/Settings.vue'),
            }
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('App/Page/Error.vue'),
    },
];

export default routes;