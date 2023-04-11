<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="fullscreen bg-orange-3 q-pa-md flex flex-center">
        <q-page-sticky position="top-right" :offset="[5, 5]">
          <q-btn flat round size="lg" color="grey" icon="close" to="/borrow" />
        </q-page-sticky>
        <div>
          <div class="q-pa-lg text-brown text-center text-weight-bold text-h6">
            I Want To Borrow
          </div>
          <q-form @submit="sendRequest" class="column items-center">
            <div class="q-pa-md flex flex-center" style="max-width: 600px">
              <q-item v-if="itemStore.singleItem">
                <q-item-section top avatar>
                  <q-avatar size="100px">
                    <img :src="itemStore.singleItem.img_url" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ itemStore.singleItem.name }}</q-item-label>
                  <q-item-label caption>
                    Pick-up location:
                    {{
                      itemStore.singleItem.lender.location.name
                    }}</q-item-label
                  >

                  <q-item-label caption>
                    Owner: {{ itemStore.singleItem.lender.name }}</q-item-label
                  >
                </q-item-section>
              </q-item>
            </div>

            <div class="q-pa-md" style="max-width: 300px">
              <q-input
                filled
                v-model="form.pick_up_date"
                label="Pick up date and time"
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
                        mask="YYYY-MM-DD HH:mm Z"
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
                        mask="YYYY-MM-DD HH:mm Z"
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
                label="Return date and time"
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
                        mask="YYYY-MM-DD HH:mm Z"
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
                        mask="YYYY-MM-DD HH:mm Z"
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
              label="Send Request"
              no-caps
              type="submit"
            />
          </q-form>
        </div> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { date, useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import { useItemStore } from "../stores/item";
import { useUserStore } from "../stores/user";
import { useContractStore } from "../stores/contract";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BorrowItemPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const itemStore = useItemStore();
    const contractStore = useContractStore();
    const userStore = useUserStore();
    const form = ref({
      item: null,
      lender: null,
      borrower: null,
      pick_up_date: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm Z"),
      return_date: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm Z"),
    });
    //const err_msg = ref("");
    async function sendRequest() {
      try {
        $q.loading.show();
        await contractStore.postContracts(form.value);

        $q.notify({
          message: "Request is sent",
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
        //err_msg.value = err?.response?.data;
      } finally {
        $q.loading.hide();
      }
    }

    onMounted(async () => {
      if (!userStore.user) {
        router.push("/login");
      } else {
        form.value.borrower = userStore.user._id;
      }
      $q.loading.show();
      await itemStore.fetchItemById(route.params.itemId);
      (form.value.item = itemStore.singleItem._id),
        (form.value.lender = itemStore.singleItem.lender._id),
        $q.loading.hide();
    });

    return { itemStore, contractStore, form, sendRequest };
  },
});
</script>
