<template>
    <h1>Sign In</h1>
    <div class="signin-page">
        <div>
            <img src="../assets/5165306-removebg-preview.png" class="signin-image">
            <h2>Please enter your username and password to sign in</h2>
            <h3>Username : </h3>
            <input type="text" v-model="username">
            <h3>Password : </h3>
            <input type="password" v-model="password">
        </div>
        <div class="signin-button"> 
            <button @click="signIn">Sign In</button>
        </div>
        <RouterLink>

        </RouterLink>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';

export default{
    name:"SignInPage",
    data(){
        return{
            users:[],
        }
    },
    props:["signin"],
    async created(){
        const response = await axios.get("/api/users")
        const users = response.data;
        this.users=users
    },
    computed:{
        ...mapState([
            "userId"
        ])
    },  
    methods:{
        ...mapActions([
            "updateUserId"
        ]) , 
        async signIn(){
            if(this.username){
                const user = this.users.find(({id})=>id===this.username)
                if(user){
                    if(this.password){
                        if(user.password === this.password){
                            alert("Successfully Signed In")                            
                            await axios.post("/api/signinstatus",{id: this.username,signInStatus:true})
                            this.updateUserId(this.username)
                            this.$router.push("/products")
                        }
                        else{
                            alert("Wrong password!")
                        }
                    }
                    else{
                        alert("Please enter your password!")
                    }
                }
                else{
                    alert("This username is not saved in the system!")
                }         
            }
            else{
                alert("Please enter your username!")
            }
        },
    }
}
</script>