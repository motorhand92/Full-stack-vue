<template>
    <h1>Shopping Cart</h1>
    <ShoppingCart @remove-from-cart="removeFromCart($event)" :cartItems="cartItems"/>
</template>

<script>
import ShoppingCart from '@/components/ShoppingCart.vue';
import axios from 'axios';

export default{
    name:"ShoppingCartPage",
    components:{
        ShoppingCart
    },
    data(){
        return{
            cartItems : [],
        }
    },
    async created(){
        const response = await axios.get(`/api/users/12345/cart`)
        const cartItems = response.data
        this.cartItems = cartItems 
        
    },
    methods:{
        async removeFromCart(productId){
            const response = await axios.delete(`/api/users/12345/cart/${productId}`)
            const updatedCart = response.data
            this.cartItems = updatedCart;
            alert("An item has been successfully removed from the cart!")
        }
    },
}
</script>