<template>
  <q-page class="flex flex-center bg-grey-1">
    <div
      v-if="store.filteredItems.length > 0"
      class="q-pa-md row items-start q-gutter-md"
    >
      <q-input
        bottom-slots
        v-model="search"
        label="Search"
        maxlength="100"
        filled
        color="orange"
        class="q-pt-md"
        style="width: 97%"
      >
        <template v-slot:append>
          <q-icon
            v-if="search !== ''"
            name="close"
            @click="search = ''"
            class="cursor-pointer"
          />
          <q-icon name="search" />
        </template>
      </q-input>
      <q-card
        v-for="item in displayedItems"
        :key="item._id"
        class="my-card"
        flat
        bordered
      >
        <q-img :src="item.img_url" />

        <q-card-section class="q-py-xs">
          <div class="text-overline text-orange-9">
            {{ item.lender.location.name }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ item.name }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <!-- <q-btn flat round color="red-2" icon="bookmark" /> -->
          <q-btn flat round color="black" icon="share" />
          <q-space />
          <q-btn flat color="brown" label="Borrow" :to="`borrow/${item._id}`" />
        </q-card-actions>
      </q-card>
    </div>
    <div v-else>No items available</div>
  </q-page>
  <!-- <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn round size="lg" color="brown" icon="add" />
  </q-page-sticky> -->
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { useItemStore } from "stores/item";
import { ItemStatusEnum } from "../enums";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "BorrowPage",
  setup() {
    const $q = useQuasar();
    const store = useItemStore();
    const displayedItems = ref([]);
    const route = new useRoute();
    const router = new useRouter();
    const search = ref(route.query.item);
    onMounted(async () => {
      $q.loading.show();
      await store.fetchItems();
      displayedItems.value = store.filteredItems;
      searchItem(search.value);
      $q.loading.hide();
    });

    watchEffect(() => searchItem(search.value));

    function searchItem(value) {
      if (value) {
        displayedItems.value = store.filteredItems.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        router.replace({ query: { item: search.value } });
      } else {
        displayedItems.value = store.filteredItems;
        router.replace({ query: null });
      }
    }

    function share(itemName) {
      // route.query.item;
    }

    return {
      store,
      ItemStatusEnum,
      search,
      displayedItems,
      searchItem,
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
