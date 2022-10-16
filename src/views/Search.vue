<template>
    <ion-page>

        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Search</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>

            <ion-item class="search ion-margin">
                <ion-input v-model="searchValue" placeholder="Enter main ingredient"></ion-input>
                <ion-icon :icon="searchOutline" @click="getJSON()"></ion-icon>
            </ion-item>
            <div v-if="mealDataList != null">
                <ion-list v-for="meal in mealDataList" :key="meal.idMeal">
                    <ion-item @click="navigateDetail(meal.idMeal)" class="ion-margin">
                        <ion-thumbnail slot="start">
                            <ion-img :src="meal.strMealThumb" :alt="meal.strMeal" class="border"></ion-img>
                        </ion-thumbnail>
                        <ion-label>
                            {{ meal.strMeal }}
                        </ion-label>
                    </ion-item>
                </ion-list>
            </div>
            <div v-else>
                <p> Enter a main category like beef,lamb, seafood</p>
            </div>

        </ion-content>

    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
    IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon,
    loadingController, IonMenuButton, IonLabel, IonItem, IonImg, IonThumbnail, IonList, IonInput
} from '@ionic/vue';
import { searchOutline, searchSharp } from 'ionicons/icons';


export default defineComponent({
    name: 'SearchPage',
    components: {
        IonButtons,
        IonContent,
        IonInput,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonIcon,
        IonLabel, IonItem, IonImg, IonThumbnail, IonList
    },
    setup() {
        const router = useRouter();
        return { router, searchOutline, searchSharp };
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

            let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.searchValue}`;
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
            searchValue: '',


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

p {
    font-size: medium;
    font-weight: 500;
    line-height: 32px;
    margin-top: 150px;
    text-align: center;
    padding: 5px;
}


ion-item.search {
    --border-radius: 10px;
    --background: #ddaa00;
    --color: white;
}
</style>
