<template>
  <div class="q-pa-md full-width">
    <q-list padding>
      <q-item-label header>My Items</q-item-label>
      <template v-for="item in itemStore.myItems" :key="item._id">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img :src="item.img_url" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-space />
            <q-item-label caption>
              Status:
              <q-badge
                v-if="item.status === ItemStatusEnum.available"
                color="teal"
                class="q-ml-xs"
                >Available</q-badge
              >
              <div v-if="item.status === ItemStatusEnum.notAvailable">
                borrowed by xxx
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{
              dayjs(item.updatedAt).fromNow()
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </template>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useItemStore } from "src/stores/item";
import { useQuasar } from "quasar";
import { ItemStatusEnum } from "src/enums";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default defineComponent({
  name: "MyItems",
  setup() {
    dayjs.extend(relativeTime);
    const itemStore = useItemStore();
    const $q = useQuasar();
    onMounted(async () => {
      $q.loading.show();
      await itemStore.fetchMyItems();
      $q.loading.hide();
    });
    return { ItemStatusEnum, itemStore, dayjs };
  },
});
</script>
