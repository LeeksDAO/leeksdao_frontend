import {
  createRouter,
  createWebHistory,
  type Router,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';
import { nextTick } from 'vue';

// Pinia Store
import { useGlobal } from '@/store';

// Components
import AboutPage from '@/views/AboutPage.vue';
import HomePage from '@/views/HomePage.vue';
import MetaVase from '@/views/MetaVase.vue';
/** Router Rules */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/metavase',
    name: 'MetaVase',
    component: MetaVase,
  },
];

/** Vue Router */
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory(import.meta.env.BASE_URL)
  routes,
});

router.beforeEach(
  async (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const globalStore = useGlobal();
    // Show Loading
    globalStore.setLoading(true);
    globalStore.setMessage('');
    await nextTick();

    next();
  }
);

router.afterEach(() => {
  const globalStore = useGlobal();
  // Hide Loading
  globalStore.setLoading(false);
});

export default router;
