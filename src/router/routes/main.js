export default [
    {
        path: '/main',
        name: 'main',
        props: true,
        component: () => import('../../views/Main.vue')
    },
]