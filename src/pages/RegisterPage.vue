<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center"
      >
        <q-page-sticky position="top-right" :offset="[5, 5]">
          <q-btn flat round size="lg" color="grey" icon="close" to="/profile" />
        </q-page-sticky>
        <div>
          <q-input
            class="q-pa-xs"
            filled
            color="brown"
            v-model="form.name"
            label="Name"
            placeholder="John Doe"
          />
          <q-select
            filled
            class="q-pa-xs"
            color="brown"
            v-model="form.location"
            :options="locationOptions"
            map-options
            emit-value
            label="Location"
            behavior="menu"
          />
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
            label="Register"
            no-caps
            @click="register"
          />
        </div> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { useLocationStore } from "../stores/location";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const userStore = useUserStore();
    const locationStore = useLocationStore();
    let locationOptions = ref([]);
    const form = ref({
      location: "",
      name: "",
      email: "",
      phone_no: "",
    });
    const err_msg = ref("");
    async function register() {
      try {
        $q.loading.show();
        await userStore.register(form.value);
        if (userStore.user) {
          router.push("/profile");
        }
      } catch (err) {
        err_msg.value = err?.response?.data;
      } finally {
        $q.loading.hide();
      }
    }

    onMounted(async () => {
      $q.loading.show();
      await locationStore.fetchLocations();
      locationOptions.value = locationOptions.value.concat(
        locationStore.locations.map((location) => {
          return { label: location.name, value: location._id };
        })
      );
      $q.loading.hide();
    });
    return { err_msg, form, register, locationOptions };
  },
});
</script>

// TODO: e-mail validate, check if the email is already registered
