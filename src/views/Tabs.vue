<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="้swipe-shop" href="/swipe-shop">
          <ion-icon :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="contents" href="/contents">
          <ion-icon :icon="ellipse" />
          <ion-label>บทความ</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="้home" href="/home">
          <ion-icon :icon="square" />
          <ion-label>หน้าแรก</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cart" href="/cart">
          <ion-icon :icon="square" />
          <ion-label>ตะกร้าสินค้า</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="account" href="/account">
          <ion-icon :icon="square" />
          <ion-label>บัญชี</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
}
</script>