export default [
    {
        path: '/',
        name: 'home',
        props: true,
        component: () => import('../../views/HomeView.vue')
    },
]