<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl">
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button @click="$emit('add-to-cart',product.id)" class="add-to-cart" v-if="!itemIsInCart">Add to Cart</button>
            <button class="grey-button" v-if="itemIsInCart">Item is already in cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage/>
    </div>
</template>

<script>
import NotFoundPage from '@/pages/NotFoundPage.vue';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name:"ProductDetails",
    components:{
        NotFoundPage,
    },
    data(){
        return{
            cartItems :[]
        }
    },
    props:["product"],
    computed:{
        ...mapState([
            "userId"
        ]),
        itemIsInCart(){
            return this.cartItems.some(item=>item.id===this.$route.params.productId);
        }
    },
    async created(){
        const cartResponse = await axios.get(`/api/users/${this.userId}/cart`)
        const cartItems = cartResponse.data
        this.cartItems = cartItems
    },
}

</script>