<template>
  <q-page v-if="!userStore.user" class="flex flex-center bg-grey-1">
    Lend an item
  </q-page>
  <q-page class="flex bg-grey-1">
    <MyItems></MyItems>
  </q-page>
  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn round size="lg" color="brown" icon="add" to="/lenditem" />
  </q-page-sticky>
</template>

<script>
import { defineComponent } from "vue";
import MyItems from "src/components/MyItems.vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  name: "LendPage",
  components: { MyItems },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
});
</script>
