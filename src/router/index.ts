import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
    // @ts-ignore
(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const requiresAuth: boolean = to.matched.some(
      (record) => record.meta.requiresAuth
    );
    const isAuthenticated: string | null = localStorage.getItem('token');

    if (requiresAuth && !isAuthenticated) {
      next('/login');
    } else if (!requiresAuth && isAuthenticated && to.name === 'Login') {
      next('/');
    } else {
      next();
    }
  }
);

export default router;
