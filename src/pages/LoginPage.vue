<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center"
      >
        <q-page-sticky position="top-right" :offset="[5, 5]">
          <q-btn flat round size="lg" color="grey" icon="close" to="/" />
        </q-page-sticky>
        <div>
          <q-input
            class="q-pa-xs"
            filled
            color="brown"
            v-model="form.email"
            label="KTH email"
            placeholder="xxx@kth.se"
          />
          <q-input
            class="q-pa-xs"
            filled
            color="brown"
            v-model="form.phone_no"
            label="Phone No."
            placeholder="+42xxxxxxxx"
          />
          <div class="text-red" v-if="err_msg">
            {{ err_msg }}
          </div>
          <q-btn
            class="q-mt-md"
            color="brown"
            size="lg"
            text-color="white"
            unelevated
            label="Login"
            no-caps
            @click="login"
          />
        </div> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const store = useUserStore();
    const form = ref({ email: "", phone_no: "" });
    const err_msg = ref("");
    async function login() {
      try {
        $q.loading.show();
        await store.login(form.value);
        console.log("11");
        if (store.user) {
          console.log("22");
          router.push("/");
        }
      } catch (err) {
        err_msg.value = err?.response?.data;
      } finally {
        $q.loading.hide();
      }
    }
    return { err_msg, form, store, login };
  },
});
</script>
