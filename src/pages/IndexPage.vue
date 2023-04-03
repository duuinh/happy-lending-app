<template>
  <q-page v-if="!userStore.user" class="flex flex-center bg-grey-1">
    Home page
  </q-page>
  <q-page v-else class="flex bg-grey-1">
    <MyContracts></MyContracts>
  </q-page>
</template>

<script>
import MyContracts from "src/components/MyContracts.vue";
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user";

export default defineComponent({
  name: "IndexPage",
  components: { MyContracts },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
});
</script>
