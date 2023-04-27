<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-page
          class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center"
        >
          <q-page-sticky position="top-right" :offset="[5, 5]">
            <q-btn flat round size="lg" color="grey" icon="close" to="/borrow" />
          </q-page-sticky>
  
          <div class="q-pa-lg text-brown text-center text-weight-bold text-h6">
            I Want To Borrow
          </div>
  
          <q-form
            @submit="submit"
            class="q-gutter-y-md column text-center items-center"
          >
  
            <q-input
              v-model.trim="form.name"
              filled
              label="What do you want to borrow?"
              stack-label
              color="brown"
              maxlength="50"
              counter
              placeholder="Name of item"
              style="width: 200px"
              :rules="[(val) => !!val || 'Field is required']"
            />

            <div class="q-pa-md" style="max-width: 300px">
              <q-input
                filled
                v-model="form.pick_up_date"
                label="Desired pickup date and time"
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="form.pick_up_date"
                        mask="YYYY-MMM-DD HH:mm"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="orange"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="form.pick_up_date"
                        mask="YYYY-MMM-DD HH:mm"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="orange"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="q-pa-md" style="max-width: 300px">
              <q-input
                filled
                v-model="form.return_date"
                label="Desired return date and time"
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="form.return_date"
                        mask="YYYY-MMM-DD HH:mm"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="form.return_date"
                        mask="YYYY-MMM-DD HH:mm"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

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
  import { date, useQuasar } from "quasar";
  import { defineComponent, ref, onMounted } from "vue";
  import { useItemStore } from "../stores/item";
  import { useRequestedItemStore } from "../stores/requested_item";
  import { useUserStore } from "../stores/user";
  import { useRouter } from "vue-router";
  
  
  export default defineComponent({
    name: "BorrowRequestPage",
    setup() {
      const $q = useQuasar();
      const router = useRouter();
      const userStore = useUserStore();
      const requestedItemStore = useRequestedItemStore();
      const form = ref({
        name: "",
        pick_up_date: date.formatDate(Date.now(), "YYYY-MMM-DD HH:mm"),
        return_date: date.formatDate(Date.now(), "YYYY-MMM-DD HH:mm"),
      });

    //   function onFileChange(file) {
    //     new Compressor(file, {
    //       quality: 0.8,
    //       maxWidth: 800,
    //       success(result) {
    //         form.value.file = new File([result], file.name);
    //       },
    //       error(err) {
    //         console.log(err.message);
    //       },
    //     });
    //     form.value.img_url = URL.createObjectURL(file);
    //   }
      async function submit() {
        try {
          $q.loading.show();
          await requestedItemStore.postRequestedItems(form.value);
  
          $q.notify({
            message: "Your request is added",
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
  
          router.push("/home"); // don't know where to redirect
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
        requestedItemStore,
        // checkFileType(files) {
        //   return files.filter(
        //     (file) => file.type === "image/png" || file.type === "image/jpeg"
        //   );
        // },
        // onRejected(rejectedEntries) {
        //   $q.notify({
        //     type: "negative",
        //     message: `upload image only (.jpg or .png)`,
        //   });
        // },
      };
    },
  });
  </script>
  