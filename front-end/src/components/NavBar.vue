<template>
<div class="nav-bar">
    <RouterLink to="/products">
        <div class="logo-wrap">
            <img :src="logo">
        </div>
    </RouterLink>

    <RouterLink to="/cart">
        <div class="nav-buttons-wrap">
            <button>Shopping Cart</button>    
        </div>
    </RouterLink>
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