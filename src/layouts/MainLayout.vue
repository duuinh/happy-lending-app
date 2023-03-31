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
        <q-btn
          v-if="store.user"
          round
          dense
          flat
          color="grey-8"
          icon="notifications"
          ><q-badge color="red" text-color="white" floating> 2 </q-badge>
          <q-menu>
            <q-list>
              <div v-for="n in 2" :key="n">
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">Brunch this weekend?</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">Janet</span>
                      -- I'll be in your neighborhood doing errands this
                      weekend. Do you want to grab brunch?
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top> 1 min ago </q-item-section>
                </q-item>
                <q-separator spaced inset />
              </div>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white">
      <q-tabs
        v-model="tab"
        dense
        class="bg-orange-1 text-brown shadow-2"
        align="justify"
      >
        <q-route-tab to="/" name="home" icon="home" label="Home" />
        <q-route-tab to="/borrow" name="borrow" icon="circle" label="Borrow" />
        <q-route-tab to="/lend" name="lend" icon="circle" label="lend" />
        <q-route-tab
          to="/profile"
          name="profile"
          icon="circle"
          label="Profile"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  name: "MainLayout",
  setup() {
    return {
      tab: ref("home"),
      store: useUserStore(),
    };
  },
});
</script>
