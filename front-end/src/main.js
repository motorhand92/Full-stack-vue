import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import * as VueRouter from "vue-router"
import "./temp-data"
import "./main.css"
import ProductsPage from './pages/ProductsPage.vue'
import ShoppingCartPage from './pages/ShoppingCartPage.vue'
import ProductDetailsPage from './pages/ProductDetailsPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import SignInPage from './pages/SignInPage.vue'

const store = createStore({
    state(){
        return{
            userId: null
        }
    },
    mutations:{
        setUserId (state,updatedUserId){
            state.userId = updatedUserId
        }
    },
    actions:{
        updateUserId({commit},updatedUserId){
            commit("setUserId",updatedUserId) 
         }
    }
})

createApp(App)
.use(VueRouter.createRouter({
    history:VueRouter.createWebHistory(process.env.BASE_URL),
    routes:[{
        path:"/products",
        component:ProductsPage,
    },{
        path:"/cart",
        component:ShoppingCartPage,
    },{
        path:"/signin",
        component:SignInPage,
    },{
        path:"/products/:productId",
        component:ProductDetailsPage,
    },{
        path:"/:pathMatch(.*)*",
        component:NotFoundPage,
    },{
        path:"/",
        redirect:"/products"
    }]
}))
.use(store)
.mount('#app')
