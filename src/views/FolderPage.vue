<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Recipe of the Moment</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list :fullscreen="true">
        <div class="ion-text-center ion-margin">
          <ion-img :src="mealData.strMealThumb" class="border" alt="meal Image">
          </ion-img>
        </div>

        <ion-card-title class="ion-text-center"> {{ mealData.strMeal }}</ion-card-title>

        <div class="ion-margin">
          <ion-item class="ingredient">
            <ion-label class="ion-margin-top data ion-text-uppercase">
              Origin: {{ mealData.strArea }}
            </ion-label>
          </ion-item>
          <ion-item class="instruction">
            <ion-label class="ion-margin-top  ion-text-uppercase data">
              Category: {{ mealData.strCategory }}
            </ion-label>
          </ion-item>
        </div>
        <ion-card-title class="ion-text-center ion-margin">Ingredients</ion-card-title>
        <div style="border-radius: 10px;background-color: #ddaa00;" class="ion-margin">
          <ion-item class="ingredient" v-for="item of mealData.ingredients" :key="item">
            <ion-icon :icon="addCircleOutline"></ion-icon>
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </div>
        <ion-card-title class="ion-text-center ion-margin-top">Instructions</ion-card-title>
        <div style="border-radius: 10px;background-color: #a65111;" class="ion-margin">

          <ion-item class="instruction" v-for="item of mealData.strInstructions" :key="item">
            <ion-icon :icon="addCircleOutline"></ion-icon>
            <ion-label class="ion-text-wrap">{{ item }}</ion-label>
          </ion-item>
        </div>

      </ion-list>

    </ion-content>


  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonMenuButton,
  IonToolbar, IonImg, loadingController, IonCardTitle, IonItem, IonLabel
} from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';


export default defineComponent({
  name: 'FolderPage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonCardTitle,
    IonItem, IonLabel
  },
  setup() {
    return { addCircleOutline };
  },

  ionViewDidEnter() {

    this.getJSON();

  },
  methods: {

    async getJSON() {

      const loading = await loadingController.create({ message: "Attendez SVP...", });
      await loading.present();
      let url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {

          this.mealData = data.meals[0];
          this.mealData.ingredients = this.getIngrdient(data.meals[0]);
          this.mealData.strInstructions = this.getInstructions(data.meals[0]);
          loading.dismiss();

        });

    },

    getIngrdient(myMeal: any): string[] {
      let count = 1;
      let tabIngredient = [];
      for (let i in myMeal) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && myMeal[i]) {
          ingredient = myMeal[i];
          measure = myMeal[`strMeasure` + count];
          count += 1;
          tabIngredient.push(`${measure} ${ingredient}`);

        }

      }
      return tabIngredient;
    },
    getInstructions(myMeal: any): string[] {
      let tabInstructions = [];
      tabInstructions = myMeal["strInstructions"].split(".").slice(0, -1);
      return tabInstructions;
    }
  },
  data() {

    return {
      mealData:
      {
        idMeal: '',
        strMeal: '',
        strCategory: '',
        strMealThumb: '',
        strInstructions: [''],
        strArea: '',
        ingredients: ['']
      },

    };
  },


});
</script>

<style scoped>
ion-toolbar {
  --background: #a65111;
  --color: white;
}

ion-menu-button {
  --color: white;
}

.border {
  border-radius: 20px !important;
}

ion-content {
  --ion-background-color: white;
}


ion-img {
  border-radius: 15px !important;
  overflow: hidden;
}

.ingredient {
  --background: #ddaa00;
  --border-radius: 10px;
  --border-style: dotted;
}

.instruction {
  --background: #a65111;
  --color: white;
  --border-radius: 10px;
  --border-style: dotted;
}



ion-icon {
  margin-right: 10px;
}



.data {
  font-size: medium;
  font-weight: 500;


}
</style>
