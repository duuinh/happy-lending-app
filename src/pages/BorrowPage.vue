<template>
  <q-page class="flex flex-center bg-grey-1">
    <div
      v-if="store.items.length > 0"
      class="q-pa-md row items-start q-gutter-md"
    >
      <q-card
        v-for="item in store.items"
        :key="item._id"
        class="my-card"
        flat
        bordered
      >
        <q-img :src="item.img_url" />
        <q-badge
          v-if="item.status === ItemStatusEnum.available"
          floating
          color="teal"
          >Available</q-badge
        >
        <q-badge v-else floating color="red">Not Available</q-badge>
        <q-card-section class="q-py-xs">
          <div class="text-overline text-orange-9">
            {{ item.lender.location.name }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ item.name }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat round color="red-2" icon="bookmark" />
          <q-btn flat round color="black" icon="share" />
          <q-space />
          <q-btn flat color="brown" label="Borrow" 
          :to="`borrow/${item._id}`" />
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
import { defineComponent, onMounted } from "vue";
import { useItemStore } from "stores/item";
import { ItemStatusEnum } from "../enums";

export default defineComponent({
  name: "BorrowPage",
  setup() {
    const $q = useQuasar();
    const store = useItemStore();
    onMounted(async () => {
      $q.loading.show();
      await store.fetchItems();
      $q.loading.hide();
    });

    return {
      store,
      ItemStatusEnum,
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style>
