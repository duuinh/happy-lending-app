<template>
  <q-page class="flex bg-grey-1">
    <RequestedItems></RequestedItems>
    <MyItems v-if="userStore.user"></MyItems>
  </q-page>
  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn round size="lg" color="brown" icon="add" to="/lend/item" />
  </q-page-sticky>
</template>

<script>
import { defineComponent } from "vue";
import MyItems from "src/components/MyItems.vue";
import RequestedItems from "src/components/RequestedItems.vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  name: "LendPage",
  components: { MyItems, RequestedItems },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
});
</script>
