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
    path: "/profile/edit",
    component: () => import("pages/UpdateProfilePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },

  {
    path: "/lend/item",
    component: () => import("pages/LendItemPage.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/borrow/:itemId",
    component: () => import("pages/BorrowItemPage.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/borrow/item_request",
    component: () => import("pages/BorrowRequestPage.vue"),
    meta: { requiresAuth: true },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
