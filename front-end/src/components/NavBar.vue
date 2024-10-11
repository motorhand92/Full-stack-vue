<template>
<div class="nav-bar">
    <RouterLink to="/products">
        <div class="logo-wrap">
            <img :src="logo">
        </div>
    </RouterLink>

    <div class="nav-buttons-wrap">
        <h3 class="nav-userid" v-if="this.userId!=null">Hello, {{ this.userId }}</h3>
        <button class="nav-buttons" @click="signOut" v-if="this.userId!=null">Sign Out</button>  
        <RouterLink to="/signin">
            <button class="nav-buttons" v-if="this.userId==null">Sign In</button> 
        </RouterLink>
        <RouterLink to="/cart">
            <button class="nav-buttons">Shopping Cart</button> 
        </RouterLink>
    </div>
</div>

</template>

<script>
import logo from "@/assets/logo-hexagon.svg"
import { mapState,mapActions } from "vuex";
import axios from "axios";

export default{
    name:"NavBar",
    data(){
        return{
            logo,
            user:[]
        }
    },
    computed:{
        ...mapState([
            "userId"
        ])
    },
    methods:{
        ...mapActions([
            "updateUserId"
        ]),
        async signOut(){
            const response = await axios.get(`/api/users/${this.userId}`)
            const user = response.data
            this.user=user

            const updatedResponse = await axios.post("/api/signinstatus",{id:this.userId,signInStatus:false})
            const updatedUser = updatedResponse.data
            this.user = updatedUser

            this.updateUserId(null)
            alert("You've signed out!")
            this.$router.push("/products")
        }
    }
}
</script>