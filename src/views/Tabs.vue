<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="้home" href="/home">
          <ion-icon :icon="home"/>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="borrow" href="/borrow">
          <ion-icon :icon="cart" />
          <ion-label>Borrow</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="lend" href="/lend">
          <ion-icon :icon="cart" />
          <ion-label>Lend</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="account" href="/account">
          <ion-icon :icon="person" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { home, cart, person, dice, document } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      home,
      cart,
      person,
      dice,
      document,
    }
  }
}
</script>