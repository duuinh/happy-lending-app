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
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
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
                {{ contract.item.name }}.
              </div>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{
              dayjs(contract.updatedAt).fromNow()
            }}</q-item-label>
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

    return { contractStore, userStore: useUserStore(), dayjs };
  },
});
</script>
