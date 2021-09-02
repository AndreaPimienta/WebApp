<template>
    <div id="User">
        <h2> Hola!  <span> {{username}}, </span>Vive una explosión de sabores al estilo Peruano!</h2>
    </div>
</template>

<script>
    export default {
        name: "User",

        data:function(){
            return {
                username: "none"
            }
        },

        created: function(){
            this.username = this.$route.params.username
        }
    }
</script>

<style>
    body{
        margin: 0%;
        background-image: url("../assets/ceviche.jpg");
        background-position: 30%;
    }
    #User{
        width: 100%;
        height: auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;    
        align-items: center;
        background: rgba(0, 0, 0, 0.575);
    }

    #User h2{
        font-size: 50px;
        color: #ffff;
        display: center;
        justify-content: center;
        text-align: center;
    }

    #User span{
        color: #ffff;
        font-weight: bold;
    }
</style>