<template>
    <h1>Product Details</h1>
    <ProductDetails @add-to-cart="addToCart($event)" :product="product" />
</template>

<script>

import ProductDetails from '@/components/ProductDetails.vue';
import axios from 'axios';

export default{
    name:"ProductDetailsPage",
    components:{
        ProductDetails
    },
    props:["user"],
    data(){
        return{
            product: [],
        }
    },
    methods:{
        async addToCart(){
            const response = await axios.post(`/api/users/12345/cart/`,{id: this.$route.params.productId})
            const updatedCart = response.data
            this.product=updatedCart;
            alert("An Item successfully added to cart!")
        },
    },
    async created(){
        const response = await axios.get(`/api/products/${this.$route.params.productId}`)
        const product = response.data
        this.product=product;
    },
}
</script>