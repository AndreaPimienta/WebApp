<template>
    <div id="AuthUser" class="auth_user">
        <div class="container_auth_user">
            <h2>Autenticarse</h2>
            <form v-on:submit.prevent="processAuthUser" >
                <input type="text" v-model="user_in.username" placeholder="Username">
                <br>
                <input type="password" v-model="user_in.password" placeholder="Password">
                <br>
                <button type="submit">Iniciar Sesion</button>
                
            </form>
            <button type="button" class="btn btn-warning" @click="registro" > Registrarse </button>
        </div>
        
    </div>
</template>

<script>

import gql from 'graphql-tag'
import jwt_decode from "jwt-decode"

export default {
    name: "UserAuth",

    data: function(){
        return {
            user_in: {
                username:"",
                password:""
            }
        }
    },

    methods: {
        
        processAuthUser: async function(){
            console.log(this.user_in)
            await this.$apollo.mutate({
                mutation: gql`
                    mutation ($authenticateCredentials: CredentialsInput!) {
                        authenticate(credentials: $authenticateCredentials) {
                            refresh
                            access
                        }
                    }`, 
                variables: {
                    authenticateCredentials: this.user_in
                }
                

            }).then((result) => {

                let data = result.data.authenticate
                data.user_id = jwt_decode(data.access).user_id.toString().padStart(3, "0")

                this.$emit('log-in', data, this.user_in.username)

            }).catch((error) => {
                alert("El usuario y/o contraseña son incorrectos")
            });
        },
        registro: function () {
        this.$router.push({
            name: "register",
            params: { username: "Juan" }
        });
    },
    }
    
}
</script>

<style>
    body{
        margin: 0%;
        background-image: 
            url("../assets/ceviche.jpg") no-repeat center center fixed;
             -webkit-background-size: cover;
             -moz-background-size: cover;
             -o-background-size: cover;
             background-size: cover;
            
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center; 
    }

    .auth_user{
        margin: 0;
        padding: 0%;
        height: auto;
        min-height: 90vh;
        width: 100%;    
        display: flex;
        justify-content: center;
        align-items: center;
        
        margin: 0%;     
        background-position: 200%;
        background: rgba(0, 0, 0, 0.575);

    }

    .container_auth_user {
        border: 3px solid  #ffff;
        border-radius: 10px;
        width: 25%;
        height: 60%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .auth_user h2{
        color: #ffffff;

    }

    .auth_user form{
        width: 50%;
        
    }

    .auth_user input{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #2BAEB7;
        
    }

    .auth_user button{
        width: 100%;
        height: 40px;

        color: #E5E7E9;
        background: #2BAEB7;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0;
    }

    .auth_user button:hover{
        color: #E5E7E9;
        background: #2BAEB7;
        border: 1px solid #2BAEB7;
    }
    #AuthUser .btn-warning{
    color: #E5E7E9;
    background: #2BAEB7;
    border: 1px solid #E5E7E9;
    width: 50%;
    }
    #AuthUser .btn-warning:hover{
        color: #E5E7E9;
        background: #2BAEB7;
        border: 1px solid #2BAEB7;
    }
</style>