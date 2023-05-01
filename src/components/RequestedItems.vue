<template>
  <div class="q-px-md full-width">
    <q-list padding>
      <q-item-label header>Requested Items</q-item-label>
      <div v-if="requestedItemStore.filteredItems.length">
        <template
          v-for="item in requestedItemStore.filteredItems"
          :key="item._id"
        >
          <q-item>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-space />
              <q-item-label caption>
                <div class="text-weight-bold">Pick-up date:</div>
                <div class="q-pb-xs">
                  {{
                    dayjs(item.pick_up_date).format(
                      "MMM DD, YYYY (ddd) - hh:mm A"
                    )
                  }}
                </div>
                <div class="text-weight-bold">Return date:</div>
                <div>
                  {{
                    dayjs(item.return_date).format(
                      "MMM DD, YYYY (ddd) - hh:mm A"
                    )
                  }}
                </div>
                <div class="text-weight-bold">Borrower:</div>
                <div>
                  {{ item.borrower.name }} ({{ item.borrower.location.name }})
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{
                dayjs(item.updatedAt).fromNow()
              }}</q-item-label>
              <div class="text-grey-8 q-gutter-xs q-pt-md">
                <q-btn
                  color="deep-orange"
                  :to="`/lend/item?name=${item.name}&request_id=${item._id}`"
                  >Lend</q-btn
                >
              </div>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </template>
      </div>
      <div v-else class="flex flex-center text-grey">No Requested Items</div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRequestedItemStore } from "src/stores/requested_item";

export default defineComponent({
  name: "RequestedItems",
  setup() {
    dayjs.extend(relativeTime);
    const requestedItemStore = useRequestedItemStore();
    const $q = useQuasar();

    onMounted(async () => {
      $q.loading.show();
      await requestedItemStore.fetchRequestedItems();
      $q.loading.hide();
    });
    return {
      requestedItemStore,
      dayjs,
    };
  },
});
</script>
