const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/borrow", component: () => import("pages/BorrowPage.vue") },
      { path: "/lend", component: () => import("pages/LendPage.vue") },
      { path: "/profile", component: () => import("pages/ProfilePage.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;