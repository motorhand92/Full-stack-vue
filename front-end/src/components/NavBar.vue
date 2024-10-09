<template>
<div class="nav-bar">
    <RouterLink to="/products">
        <div class="logo-wrap">
            <img :src="logo">
        </div>
    </RouterLink>

    <div class="nav-buttons-wrap">
        <RouterLink to="/signin">
            <button class="nav-buttons">Sign In</button> 
        </RouterLink>
        <RouterLink to="/cart">
            <button class="nav-buttons">Shopping Cart</button> 
        </RouterLink>
    </div>
</div>

</template>

<script>
import logo from "@/assets/logo-hexagon.svg"

export default{
    name:"NavBar",
    data(){
        return{
            logo,
        }
    },
}
</script>