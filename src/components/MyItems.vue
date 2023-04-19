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
              Status: {{ item.status }}
              <!-- <q-badge
                v-if="item.status === ItemStatusEnum.available"
                color="teal"
                class="q-ml-xs"
                >Available</q-badge
              > -->
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{
              dayjs(item.updatedAt).fromNow()
            }}</q-item-label>

            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                :icon="
                  item.status === ItemStatusEnum.unlisted
                    ? 'visibility'
                    : 'visibility_off'
                "
                @click="
                  item.status === ItemStatusEnum.unlisted
                    ? showItem(item._id)
                    : hideItem(item._id)
                "
              />
              <q-btn
                v-if="navigator.share"
                flat
                round
                color="black"
                icon="share"
                :disable="item.status === ItemStatusEnum.unlisted"
                @click="share(item.name)"
              />
            </div>
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

    function share(itemName) {
      if (navigator.share) {
        navigator
          .share({
            title: "HappyLending",
            text: `Hey there! Have you heard of HappyLending? I'm lending my ${itemName} on HappyLending. Check it out!`,
            url: `${process.env.VUE_APP_DOMAIN}/borrow?item=${itemName}`,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      }
    }

    async function showItem(id) {
      $q.loading.show();
      await itemStore.updateStatus(id, ItemStatusEnum.available);

      $q.notify({
        message: "Your item is listed",
        color: "deep-orange",
        position: "top",
        actions: [
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* ... */
            },
          },
        ],
      });

      await itemStore.fetchMyItems();
      $q.loading.hide();
    }

    async function hideItem(id) {
      $q.dialog({
        title: "Are sure you want to unlist your item?",
        color: "deep-orange",
        message: "People won't be able to find your item on the borrow page.",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.loading.show();
        await itemStore.updateStatus(id, ItemStatusEnum.unlisted);

        $q.notify({
          message: "Your item is unlisted",
          color: "deep-orange",
          position: "top",
          actions: [
            {
              label: "Dismiss",
              color: "white",
              handler: () => {
                /* ... */
              },
            },
          ],
        });

        await itemStore.fetchMyItems();
        $q.loading.hide();
      });
    }
    onMounted(async () => {
      $q.loading.show();
      await itemStore.fetchMyItems();
      $q.loading.hide();
    });
    return {
      ItemStatusEnum,
      itemStore,
      dayjs,
      navigator,
      share,
      showItem,
      hideItem,
    };
  },
});
</script>
