<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useUserStore } from "./stores/user";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();
    const store = useUserStore();
    const $q = useQuasar();
    onMounted(async () => {
      try {
        $q.loading.show();
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!store.user && storedUser) {
          await store.login({
            email: storedUser.email,
            phone_no: storedUser.phone_no,
          });
        }
      } catch (err) {
        localStorage.removeItem("user");
        router.push("/login");
        err_msg.value = err?.response?.data;
      } finally {
        $q.loading.hide();
      }
    });
  },
});
</script>
