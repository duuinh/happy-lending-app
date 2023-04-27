<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-orange-1 text-brown" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/icon-handshake.svg" />
          </q-avatar>
          HappyLending
        </q-toolbar-title>
        <notification-menu v-if="userStore.user"></notification-menu>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white">
      
      <q-tabs
        v-model="tab"
        indicator-color="brown"
        active-color="brown-10"
        dense
        
        class="bg-orange-1 text-grey-7 shadow-2"
        align="justify"
      >
        <q-route-tab to="/" name="home" icon="home" label="Home" />
        <q-route-tab
          to="/borrow"
          name="borrow"
          icon="keyboard_arrow_down"
          label="Borrow"
        />
        <q-route-tab
          to="/lend"
          name="lend"
          icon="keyboard_arrow_up"
          label="lend"
        />
        <q-route-tab
          to="/profile"
          name="profile"
          icon="account_circle"
          label="Profile"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import NotificationMenu from "src/components/NotificationMenu.vue";
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  components: { NotificationMenu },
  name: "MainLayout",
  setup() {
    return {
      tab: ref("home"),
      userStore: useUserStore(),
    };
  },
});
</script>
