import { createWebHistory, createRouter } from 'vue-router';
import SpecialPage from './pages/SpecialPage.vue';
import RankingPage from './pages/RankingPage.vue';
import MainPage from './pages/MainPage.vue';
import EventPage from './pages/EventPage.vue';
import StorePage from './pages/StorePage.vue';
import CategoriesPage from './pages/CategoriesPage.vue';
import FavorPage from './pages/FavorPage.vue';
import MyPageVue from './pages/MyPageVue.vue';
import CartPage from './pages/CartPage.vue';
import LoginPage from './pages/LoginPage.vue';
import DetailPage from './pages/DetailPage.vue';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/special',
    component: SpecialPage,
  },
  {
    path: '/ranking',
    component: RankingPage,
  },
  {
    path: '/event',
    component: EventPage,
  },
  {
    path: '/store',
    component: StorePage,
  },
  {
    path: '/category/:category',
    component: CategoriesPage,
  },
  {
    path: '/Favor',
    component: FavorPage,
  },
  {
    path: '/mypage',
    component: MyPageVue,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/product/:id',
    component: DetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
