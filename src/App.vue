<template>
  <div id="app" class="app">
    <div class="header">
      <img src="./assets/logo1.png">
      
      <nav>
        <button v-on:click="init" v-if="is_auth"> Inicio </button>
        <button v-on:click="volver" v-if="is_auth==0"> Home</button>
        <button v-on:click="productos" v-if="is_auth" > Productos </button>
        <button v-on:click="carrito" v-if="is_auth" > Carrito </button>
        <button v-on:click="ordenes" v-if="is_auth" > Ordenes </button>
        <button v-on:click="logOut" v-if="is_auth" > Cerrar Sesión </button>
        
      </nav>
    </div>
    <div class="main-component">
      <router-view v-on:log-in="logIn"></router-view>
    </div>
    <div class="footer">
      <h4>Estamos ubicados en <br> Calle 119 No. 4-34, Bogotá Colombia</h4>
      <h4>Contactanos <br> Tel:     3154276<br> Celular: 3206565434 <br> Email: encantoperuano@gmail.com </h4>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: "App",

  data: function () {
    return {
      is_auth: false,
    };
  },

  created: function () {
    this.updateAccessToken();
  },
  methods: {
    updateAccessToken: async function () {
      if (localStorage.getItem("refresh_token") == null) {
        this.$router.push({ name: "user_auth" });
        this.is_auth = false;
        return;
      }

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($refreshTokenRefresh: String!) {
              refreshToken(refresh: $refreshTokenRefresh) {
                access
              }
            }
          `,
          variables: {
            refreshTokenRefresh: localStorage.getItem("refresh_token"),
          },
        })
        .then((result) => {
          localStorage.setItem("access_token", result.data.refreshToken.access);
          this.is_auth = true;
        })
        .catch((error) => {
          alert("Su sesión expiró, vuelva a iniciar sesión.");
          this.$router.push({ name: "user_auth" });
          this.is_auth = false;
          localStorage.clear();
        });
    },

    logIn: async function (data, username) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("current_username", username);

      await this.updateAccessToken();
      if (this.is_auth) this.init();
    },

    init: function () {
      this.$router.push({
        name: "user",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    volver: async function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("current_username");

    await this.updateAccessToken();
    },

    productos: function () {
      this.$router.push({
        name: "menu",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    carrito: function () {
      this.$router.push({
        name: "carrito",
        params: { username: localStorage.getItem("current_username") },
      });
    },

    ordenes: function () {
      this.$router.push({
        name: "orders",
        params: { username: localStorage.getItem("current_username") },
      });
    },
    logOut: async function () {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("current_username");

      await this.updateAccessToken();
    },
  },
};
</script>

<style>
  body{
    margin: 0 0 0 0;
  }

  .header{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 15vh;
    min-height: 100px;
    margin: 0%;
    padding: 0;

    background-color: #ffffff ;
    color:#2BAEB7  ;
    border-bottom: 1px solid #f5a018;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;
  }
  .header img{
    height: 95%;
    margin: 2rem
  }

  .header nav {
    height: 100%;
    width: 40%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    font-size: 20px;
  }

  .header nav button{
    color: #2BAEB7;
    background: #ffff;
    border: 1px solid #ffff;

    border-radius: 5px;
    padding: 10px 20px;
  }

  .header nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    height: auto;
    min-height: 90vh;
    margin: 0%;
    padding: 0%;
    margin-bottom: 20vh;
    margin-top: 10vh;
    
  }
  body{
    margin: 0%;
    
    background-position: 200%;
  }
  .footer{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: stretch;
    align-content: center;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 110px;
    

    background-color: #2BAEB7;
    color: #ffff;
  }

  .footer h1{
    margin: 0px;
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: left;
    align-items: left;
  }
    .footer h3{
    margin: 0px;
    width: 100%;
    height: 100%;
    
    display: flex;
    justify-content: right;
    align-items: right;
  }
</style>
