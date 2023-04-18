<template>
  <q-layout>
    <q-page class="q-pa-md bg-grey-1">
      <div class="column items-center">
        <div class="q-pa-lg text-brown text-weight-bold text-h6">Profile</div>
        <div class="column items-center" v-if="store.user">
          <q-avatar size="72px" color="brown" text-color="white">
            {{ store.user.name[0] }}
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ store.user.name }} (📞{{ store.user.phone_no }})
          </div>
          <div class="text-subtitle1 q-mt-md q-mb-xs">
            Location: {{ store.user.location.name }}
          </div>
          <div class="q-pa-lg q-gutter-sm">
            <q-btn color="brown-5" label="Update Profile" to="/profile/edit" />
            <q-btn
              unelevated
              outline
              color="brown-5"
              label="Logout"
              @click="logout"
            />
          </div>
        </div>
        <div v-else class="column items-center">
          <q-icon color="brown-4" size="72px" name="account_circle"></q-icon>
          <div class="q-pa-lg q-gutter-sm">
            <q-btn
              unelevated
              color="brown-5"
              label="Login/Register"
              to="/login"
            />
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user";
import { getAuth, signOut } from "@firebase/auth";

export default defineComponent({
  name: "ProfilePage",
  setup() {
    const store = useUserStore();
    async function logout() {
      store.user = null;
      const auth = getAuth();
      await signOut(auth);
    }
    return { logout, store };
  },
});
</script>
