<template>
    <div v-if="cartItems.length>0" >
        <div>
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
        <h3>You have any items in your cart</h3>
    </div>
</template>

<script>
export default {
    name:"ShoppingCart",
    props:["cartItems"],
}
</script>