<template>
  <div class="q-pa-md full-width">
    <q-list padding>
      <q-item-label header>Lending Items</q-item-label>
      <template
        v-for="contract in contractStore.lendingItems"
        :key="contract._id"
      >
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <q-avatar size="100px">
              <img :src="contract.item.img_url"
            /></q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ contract.item.name }}</q-item-label>
            <q-space />
            <q-item-label caption>
              <div class="q-py-xs">
                <b>Borrowed by:</b> {{ contract.borrower.name }}
              </div>
              <div class="text-weight-bold">Pick-up date:</div>
              <div class="q-pb-xs">
                {{
                  dayjs(contract.pick_up_date).format(
                    "MMM DD, YYYY (ddd) - hh:mm A"
                  )
                }}
              </div>
              <div class="text-weight-bold">Return date:</div>
              <div>
                {{
                  dayjs(contract.return_date).format(
                    "MMM DD, YYYY (ddd) - hh:mm A"
                  )
                }}
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{
              dayjs(contract.updatedAt).fromNow()
            }}</q-item-label>
            <q-btn color="deep-orange-5" class="q-mt-md">
              <div class="row items-center no-wrap">
                <div class="text-center">
                  <q-icon name="task_alt" /> <br />End
                </div>
              </div>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </template>
      <q-item-label header>Borrowing Items</q-item-label>
      <template
        v-for="contract in contractStore.borrowingItems"
        :key="contract._id"
      >
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <q-avatar size="100px">
              <img :src="contract.item.img_url" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ contract.item.name }}</q-item-label>
            <q-space />
            <q-item-label caption>
              <div class="q-py-xs">
                <b>Borrowing from:</b> {{ contract.lender.name }}
              </div>
              <div class="text-weight-bold">Pick-up date:</div>
              <div class="q-pb-xs">
                {{
                  dayjs(contract.pick_up_date).format(
                    "MMM DD, YYYY (ddd) - hh:mm A"
                  )
                }}
              </div>
              <div class="text-weight-bold">Return date:</div>
              <div>
                {{
                  dayjs(contract.return_date).format(
                    "MMM DD, YYYY (ddd) - hh:mm A"
                  )
                }}
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{
              dayjs(contract.updatedAt).fromNow()
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
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContractStore } from "src/stores/contract";

export default defineComponent({
  name: "MyContracts",
  setup() {
    dayjs.extend(relativeTime);
    const contractStore = useContractStore();
    const $q = useQuasar();

    onMounted(async () => {
      $q.loading.show();
      await contractStore.fetchLendingItems();
      await contractStore.fetchBorrowingItems();
      $q.loading.hide();
    });
    return { contractStore, dayjs };
  },
});
</script>
