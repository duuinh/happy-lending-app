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
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center">
        <!-- <q-page class="flex flex-center bg-grey-1"> Lend item page </q-page> -->
        <div class="q-pa-md">
          <div class="q-gutter-y-md row text-center" style="max-width: 300px">
            <q-img :src="singleItem.img_url" spinner-color="white" style="height: 300px; max-width: 300px">
              <div class="absolute-bottom text-subtitle1 text-center">
                {{ singleItem.name }}
              </div>
            </q-img>

            <div class="text-h4" filled label="Item Name:">
              {{ singleItem.name }}
            </div>

            <q-btn class="q-mt-md" color="brown" size="lg" text-color="white" unelevated label="Submit" no-caps
              @click="submit" />



            <!-- <div class="q-pa-md q-gutter-sm"> -->

            <!-- </div> -->
          </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import { useItemStore } from "../stores/item";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "LendItemPage",
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const store = useItemStore();
    let singleItem = ref({ img_url: '' });
    onMounted(async () => {
      $q.loading.show();
      await store.fetchItemById(route.params.itemId);
      singleItem.value = store.singleItem;
      $q.loading.hide();
    });
    return { singleItem };
  },
});
console.log("Hello")


</script>
