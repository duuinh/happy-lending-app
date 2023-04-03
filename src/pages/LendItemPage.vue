<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center"
      >
        <q-page-sticky position="top-right" :offset="[5, 5]">
          <q-btn flat round size="lg" color="grey" icon="close" to="/lend" />
        </q-page-sticky>
        <div class="q-gutter-y-md column text-center items-center">
          <q-img :src="form.img_url" spinner-color="white" style="width: 200px">
            <q-btn
              class="absolute all-pointer-events"
              icon="add_a_photo"
              color="grey"
              round
              size="xs"
              style="bottom: 8px; right: 8px"
            >
              <q-tooltip> Upload Image </q-tooltip>
            </q-btn>
          </q-img>

          <q-input
            v-model="form.name"
            filled
            label="What do you want to lend?"
            stack-label
            :dense="dense"
            color="brown"
            placeholder="Name of item"
          />
          <q-space />
          <q-btn
            class="q-mt-md"
            color="brown"
            size="lg"
            text-color="white"
            unelevated
            label="Submit"
            no-caps
            @click="submit"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, onMounted } from "vue";
import { useItemStore } from "../stores/item";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LendItemPage",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const userStore = useUserStore();
    const form = ref({
      name: "",
      img_url:
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      lender: "",
    });

    const itemstore = useItemStore();
    async function submit() {
      try {
        $q.loading.show();
        await itemstore.postItems(form.value);

        $q.notify({
          message: "Item is added",
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

        router.push("/");
      } catch (err) {
        // err_msg.value = err?.response?.data;
      } finally {
        $q.loading.hide();
      }
    }

    onMounted(async () => {
      if (!userStore.user) {
        router.push("/login");
      } else {
        form.value.lender = userStore.user._id;
      }
    });

    return { form, submit, userStore };
  },
});
</script>
