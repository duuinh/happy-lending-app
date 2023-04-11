<template>
  <q-btn round dense flat color="grey-8" icon="notifications"
    ><q-badge color="red" text-color="white" floating
      >{{ contractStore.requestedLendingContracts.length }}
    </q-badge>
    <q-menu>
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
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="checked"
              />
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            </div>
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
        <q-separator spaced inset />
      </template>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContractStore } from "src/stores/contract";
import { useUserStore } from "src/stores/user";
import { ContractStatusEnum } from "src/enums";

export default defineComponent({
  name: "NotificationMenu",
  setup() {
    dayjs.extend(relativeTime);
    const contractStore = useContractStore();
    const $q = useQuasar();

    onMounted(async () => {
      $q.loading.show();
      await contractStore.fetchLendingItems();
      $q.loading.hide();
    });

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
    return { contractStore, userStore: useUserStore(), dayjs, accept, reject };
  },
});
</script>
