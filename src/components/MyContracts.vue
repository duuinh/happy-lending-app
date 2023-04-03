<template>
  <div class="q-pa-md full-width">
    <q-list padding>
      <q-item-label header>Lending Items</q-item-label>
      <div v-if="contractStore.acceptedLendingContracts.length">
        <template
          v-for="contract in contractStore.acceptedLendingContracts"
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
                  <b>Borrower:</b> {{ contract.borrower.name }} (📞{{
                    contract.borrower.phone_no
                  }})
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
              <q-btn
                color="deep-orange-5"
                class="q-mt-md"
                @click="endContract(contract._id)"
              >
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
      </div>
      <div v-else class="flex flex-center text-grey">No Lending Items</div>
      <q-item-label header>Borrowing Items</q-item-label>
      <div v-if="contractStore.borrowingContracts.length">
        <template
          v-for="contract in contractStore.borrowingContracts"
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
                  <b>Owner:</b> {{ contract.lender.name }} (📞{{
                    contract.lender.phone_no
                  }})
                </div>
                <div class="q-py-xs"><b>Status:</b> {{ contract.status }}</div>
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
      </div>
      <div v-else class="flex flex-center text-grey">No Borrowing Items</div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContractStore } from "src/stores/contract";
import { ContractStatusEnum } from "src/enums";

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

    async function endContract(id) {
      $q.loading.show();
      await contractStore.updateContractStatus(id, ContractStatusEnum.closed);
      await contractStore.fetchLendingItems();
      $q.loading.hide();
    }
    return { contractStore, dayjs, endContract };
  },
});
</script>
