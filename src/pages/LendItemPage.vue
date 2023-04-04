<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center"
      >
        <q-page-sticky position="top-right" :offset="[5, 5]">
          <q-btn flat round size="lg" color="grey" icon="close" to="/lend" />
        </q-page-sticky>
        <q-form
          @submit="submit"
          class="q-gutter-y-md column text-center items-center"
        >
          <q-img :src="form.img_url" spinner-color="white" style="width: 200px">
          </q-img>

          <q-file
            v-model="form.file"
            filled
            @update:model-value="onFileChange($event)"
            label="Upload Image"
            :rules="[(val) => !!val || 'Image is required']"
            class="q-pb-xs"
            :filter="checkFileType"
            @rejected="onRejected"
            style="width: 200px"
          >
            <template v-slot:prepend>
              <q-icon name="add_a_photo" />
            </template>
          </q-file>

          <q-input
            v-model="form.name"
            filled
            label="What do you want to lend?"
            stack-label
            color="brown"
            placeholder="Name of item"
            style="width: 200px"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-btn
            class="q-mt-md"
            color="brown"
            size="lg"
            text-color="white"
            unelevated
            label="Submit"
            no-caps
            type="submit"
          />
        </q-form>
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
import Compressor from "compressorjs";

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
      file: null,
    });

    const itemstore = useItemStore();
    function onFileChange(file) {
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 800,
        success(result) {
          form.value.file = new File([result], file.name);
        },
        error(err) {
          console.log(err.message);
        },
      });
      form.value.img_url = URL.createObjectURL(file);
    }
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

        router.push("/lend");
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

    return {
      form,
      submit,
      userStore,
      onFileChange,
      checkFileType(files) {
        return files.filter(
          (file) => file.type === "image/png" || file.type === "image/jpeg"
        );
      },
      onRejected(rejectedEntries) {
        $q.notify({
          type: "negative",
          message: `upload image only (.jpg or .png)`,
        });
      },
    };
  },
});
</script>
