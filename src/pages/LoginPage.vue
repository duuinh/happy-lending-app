<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page
        class="fullscreen bg-orange-3 text-white text-center q-pa-md flex flex-center"
      >
        <q-page-sticky position="top-right" :offset="[5, 5]">
          <q-btn flat round size="lg" color="grey" icon="close" to="/profile" />
        </q-page-sticky>
        <q-form
          @submit="isLinkValid ? login() : sendSignInLink()"
          class="q-gutter-md"
        >
          <div class="q-pa-lg text-brown text-weight-bold text-h6">
            A magic link for login will be sent to your email...✨
          </div>

          <q-input
            class="q-pa-xs"
            filled
            color="brown"
            v-model="form.email"
            label="KTH email"
            placeholder="xxx@kth.se"
            :rules="[
              (val) =>
                /^\w+([\.-]?\w+)*@(kth\.se)+$/.test(val) ||
                'KTH email is invalid',
            ]"
          />
          <div class="text-red" v-if="err_msg">
            {{ err_msg }}
          </div>
          <q-btn
            class="q-mt-md"
            color="brown"
            size="lg"
            text-color="white"
            unelevated
            :label="isLinkValid ? 'Login' : 'Send Login Link'"
            no-caps
            type="submit"
          />
        </q-form> </q-page
    ></q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "@firebase/auth";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const userStore = useUserStore();
    const form = ref({ email: localStorage.getItem("email_login") });
    const err_msg = ref("");
    const auth = getAuth();
    const isLinkValid = isSignInWithEmailLink(auth, window.location.href);

    async function login() {
      try {
        $q.loading.show();
        if (isLinkValid) {
          var result = await signInWithEmailLink(
            auth,
            form.value.email,
            window.location.href
          );
          localStorage.removeItem("email_login");
          await userStore.findByEmail(form.value.email);
        }
      } catch (err) {
        err_msg.value = err?.message;
      } finally {
        $q.loading.hide();
        if (result._tokenResponse.isNewUser) {
          router.push("/profile/edit");
        } else {
          router.push("/profile");
        }
      }
    }
    async function sendSignInLink() {
      try {
        $q.loading.show();

        const actionCodeSettings = {
          url: `${process.env.VUE_APP_DOMAIN}/login`,
          // This must be true.
          handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(
          auth,
          form.value.email,
          actionCodeSettings
        ).then(() => {
          window.localStorage.setItem("email_login", form.value.email);
        });

        $q.dialog({
          title: "Magic link is sent to your email",
          color: "deep-orange",
          message: "Redirecting to KTH Webmail",
          cancel: false,
          persistent: true,
        }).onOk(() => {
          window.location.replace("https://webmail.kth.se/");
        });
      } catch (error) {
        err_msg.value = error.message;
      } finally {
        $q.loading.hide();
      }
    }
    return {
      err_msg,
      form,
      login,
      sendSignInLink,
      isLinkValid,
    };
  },
});
</script>
