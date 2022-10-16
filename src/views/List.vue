<template>
    <ion-page>

        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/folder/Home"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $route.params.id }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list v-for="meal in mealDataList" :key="meal.idMeal">
                <ion-item @click="navigateDetail(meal.idMeal)" class="ion-margin">
                    <ion-thumbnail slot="start">
                        <ion-img :src="meal.strMealThumb" :alt="meal.strMeal"></ion-img>
                    </ion-thumbnail>
                    <ion-label>
                        {{ meal.strMeal }}
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>

    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    loadingController, IonBackButton, IonLabel, IonItem, IonImg, IonThumbnail, IonList
} from '@ionic/vue';


export default defineComponent({
    name: 'ListPage',
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonBackButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonLabel, IonItem, IonImg, IonThumbnail, IonList
    },
    setup() {
        const router = useRouter();
        return { router };
    },

    ionViewDidEnter() {
        this.getJSON();
    },
    methods: {
        async getJSON() {
            const loading = await loadingController.create({
                message: "Attendez SVP...",
            });
            await loading.present();
            const category = this.$route.params.id;
            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
            fetch(url)
                .then((reponse) => reponse.json())
                .then((data) => {

                    this.mealDataList = data.meals;
                    loading.dismiss();
                });

        },

        navigateDetail(id: string): void {
            this.router.push(`/detail/${id}`);
        }


    },
    data() {

        return {

            mealDataList: [{
                idMeal: '',
                strMeal: '',
                strMealThumb: ''
            }],

        };
    },


});
</script>

<style scoped>
ion-toolbar {
    --background: #a65111;
    --color: white;
}

ion-back-button {
    --color: white;
}



ion-item {
    --color: #a65111;

}
</style>
