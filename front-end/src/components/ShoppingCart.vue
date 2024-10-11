<template>
    <div v-if="this.userId!=null">
        <div v-if="cartItems.length>0" >
            <div class="cart-wrap">
                <div
                class="product-container" 
                v-for="product in cartItems"
                :key="product.id"
                >
                    <img :src="product.imageUrl" class="product-image">
                    <div class="details-wrap">
                        <h3>{{ product.name }}</h3>
                        <p>{{ product.price }}</p>
                    </div>
                    <button @click="$emit('remove-from-cart',product.id)" class="remove-button">Remove From Cart</button>
                </div>
            </div>
        </div>
        <div v-if ="cartItems===0">
            <h3 class="h3text">You have any items in your cart</h3>
        </div>
    </div>
    <div v-if="this.userId==null">
        <h3 class="h3text">Please sign in to see your cart!</h3>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:"ShoppingCart",
    props:["cartItems"],
    computed:{
        ...mapState([
            "userId"
        ])
    }
}
</script>