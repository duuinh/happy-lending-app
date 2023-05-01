import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "src/stores/user";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach(async (to) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async function (user) {
      const userStore = useUserStore();
      userStore.token = auth.currentUser?.accessToken;

      // routes with `meta: { requiresAuth: true }` will check for the users, others won't
      if (!user) {
        if (to.meta.requiresAuth) {
          Router.push("/login");
          // return {
          //   path: "/login",
          //   query: {
          //     // we keep the current path in the query so we can redirect to it after login
          //     // with `router.push(route.query.redirect || '/')`
          //     redirect: to.fullPath,
          //   },
          // };
        }
      } else {
        if (!userStore.user) {
          try {
            await userStore.findByEmail(user.email);
          } catch (error) {
            Router.push("/profile/edit");
          }
        }
      }
    });
  });

  return Router;
});
