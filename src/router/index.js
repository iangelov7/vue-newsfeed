import EntertainmentNews from '../components/EntertainmentNews'
import SportsNews from '../components/SportsNews'
import WorldNews from '../components/WorldNews'


import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: '/', component: WorldNews },
    { path: '/SportsNews', component: SportsNews },
    { path: '/EntertainmentNews', component: EntertainmentNews },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
