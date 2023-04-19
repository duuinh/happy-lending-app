<template>
  <q-page
    v-if="!userStore.user"
    class="text-brown text-align:center flex flex-center bg-brown-1"
  >
    <div class="text-brown text-center flex flex-center text-h3" id="logo">
      <q-avatar size="200px">
        <img src="../assets/logo.jpg" />
      </q-avatar>
      <div
        class="title text-brown text-center flex flex-center text-weight-bold text-h6"
        id="slogan"
      >
        mattress, screwdriver, and whatever...
      </div>
    </div>

    <q-btn
      class="q-mt-md"
      color="brown"
      text-color="white"
      unelevated
      label="Login | Register"
      no-caps
      to="/login"
    />

    <footer class="text-white bg-brown-6" id="contact">
      Contact &nbsp;

      <q-icon name="email" /> &nbsp; : happylending001@gmail.com
    </footer>
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

<style>
.title {
  font-family: "customfont";
}
#logo {
  position: absolute;
  /* margin-left:auto;
    margin-right: auto; */
  width: 100%;
  /* height: 45%; */
  /* top: 0;
    bottom: 55%; */
  top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#slogan {
  position: absolute;
  width: 100%;
  /* height: 45%; */
  /* top: 45%;
    bottom: 10%; */
  top: 100%;
  /* bottom: 80%; */
  display: flex;
  justify-content: center;
  align-items: center;
}

#contact {
  position: absolute;
  width: 100%;
  /* height: 0%; */
  /* top: 90%;
    bottom: 0; */
  top: 90%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
