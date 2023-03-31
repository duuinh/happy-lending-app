<template>
  <q-page class="flex flex-center bg-grey-1"> Lend an item</q-page>

  <q-page-sticky position="bottom" :offset="[18, 18]">
    <q-btn round size="lg" color="brown" icon="add" to="/lenditem" />
  </q-page-sticky>
</template>

<script>
import { useQuasar } from "quasar";

import { defineComponent } from "vue";

export default defineComponent({
  name: "LendPage",
});
</script>
