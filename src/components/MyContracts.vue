<template>
  <div class="q-pa-md full-width">
    <q-list padding>
      <q-item-label header>Borrowing Requests</q-item-label>
      <div v-if="contractStore.requestedLendingContracts.length">
        <template
          v-for="contract in contractStore.requestedLendingContracts"
          :key="contract._id"
        >
          <q-item>
            <q-item-section top thumbnail class="q-ml-none">
              <q-avatar>
                <img :src="contract.item.img_url" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1"
                >Can I borrow your {{ contract.item.name }}?</q-item-label
              >
              <q-space />
              <q-item-label caption>
                <div class="q-py-xs">
                  {{ contract.borrower.name }} want to borrow your
                  {{ contract.item.name }} from
                  {{
                    dayjs(contract.pick_up_date).format(
                      "MMM DD, YYYY (ddd), hh:mm A"
                    )
                  }}
                  to
                  {{
                    dayjs(contract.return_date).format(
                      "MMM DD, YYYY (ddd),  hh:mm A"
                    )
                  }}
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{
                dayjs(contract.updatedAt).fromNow()
              }}</q-item-label>
              <q-btn size="12px" flat dense round icon="more_vert">
                <q-menu>
                  <q-list bordered="">
                    <q-item clickable v-ripple @click="accept(contract._id)">
                      <q-item-section avatar>
                        <q-icon color="green" name="check_circle" />
                      </q-item-section>
                      <q-item-section>Accept</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple @click="reject(contract._id)">
                      <q-item-section avatar>
                        <q-icon color="red" name="delete" />
                      </q-item-section>
                      <q-item-section>Reject</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </template>
      </div>
      <div v-else class="flex flex-center text-grey">No Borrowing Requests</div>
      <q-item-label header>Lending Items</q-item-label>
      <div v-if="contractStore.acceptedLendingContracts.length">
        <template
          v-for="contract in contractStore.acceptedLendingContracts"
          :key="contract._id"
        >
          <q-item>
            <q-item-section top thumbnail class="q-ml-none">
              <q-avatar size="80px">
                <img :src="contract.item.img_url"
              /></q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contract.item.name }}</q-item-label>
              <q-space />
              <q-item-label caption>
                <div class="q-py-xs">
                  <b>Borrower:</b> {{ contract.borrower.name }}<br />
                  (📞
                  <a :href="`tel:${contract.borrower.phone_no}`">
                    {{ contract.borrower.phone_no }}
                  </a>
                  )
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
                outline
                color="deep-orange-5"
                class="q-mt-md"
                @click="endContract(contract._id)"
              >
                <div class="row items-center no-wrap">
                  <div class="text-center">
                    <q-icon name="assignment_returned" />
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
              <q-avatar size="80px">
                <img :src="contract.item.img_url" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contract.item.name }}</q-item-label>
              <q-space />
              <q-item-label caption>
                <div class="q-py-xs">
                  <b>Owner:</b> {{ contract.lender.name }}
                  <br />
                  (📞
                  <a :href="`tel:${contract.lender.phone_no}`">
                    {{ contract.lender.phone_no }}
                  </a>
                  )
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
      <q-item-label header>Item Requests</q-item-label>
      <div v-if="requestedItemStore.myRequests.length">
        <template v-for="item in requestedItemStore.myRequests" :key="item._id">
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
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{
                dayjs(item.updatedAt).fromNow()
              }}</q-item-label>
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="close"
                @click="closeItemRequest(item._id)"
              >
              </q-btn>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </template>
      </div>
      <div v-else class="flex flex-center text-grey">No Item Requests</div>
    </q-list>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContractStore } from "src/stores/contract";
import { ContractStatusEnum, RequestedItemStatusEnum } from "src/enums";
import { useRequestedItemStore } from "src/stores/requested_item";

export default defineComponent({
  name: "MyContracts",
  setup() {
    dayjs.extend(relativeTime);
    const contractStore = useContractStore();
    const requestedItemStore = useRequestedItemStore();
    const $q = useQuasar();

    onMounted(async () => {
      $q.loading.show();
      await contractStore.fetchLendingItems();
      await contractStore.fetchBorrowingItems();
      await requestedItemStore.fetchMyRequests();
      $q.loading.hide();
    });

    function endContract(id) {
      $q.dialog({
        title: "My Item is Returned",
        color: "deep-orange",
        message: "Would you like to end the contract?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.loading.show();
        await contractStore.updateContractStatus(id, ContractStatusEnum.closed);

        $q.notify({
          message: "Lending contract is ended",
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

        await contractStore.fetchLendingItems();
        $q.loading.hide();
      });
    }

    async function accept(id) {
      $q.loading.show();
      await contractStore.updateContractStatus(id, ContractStatusEnum.accepted);

      $q.notify({
        message: "Borrowing request is accepted",
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

      await contractStore.fetchLendingItems();
      $q.loading.hide();
    }

    async function reject(id) {
      $q.loading.show();
      await contractStore.updateContractStatus(id, ContractStatusEnum.rejected);

      $q.notify({
        message: "Borrowing request is rejected",
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

      await contractStore.fetchLendingItems();
      $q.loading.hide();
    }

    async function closeItemRequest(id) {
      $q.dialog({
        title: "Close Item Request",
        color: "deep-orange",
        message: "Would you like to close your request?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        $q.loading.show();
        await await requestedItemStore.updateStatus(
          id,
          RequestedItemStatusEnum.closed
        );

        $q.notify({
          message: "Your request is closed",
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

        await requestedItemStore.fetchMyRequests();
        $q.loading.hide();
      });
    }
    return {
      contractStore,
      requestedItemStore,
      dayjs,
      endContract,
      accept,
      reject,
      closeItemRequest,
    };
  },
});
</script>
