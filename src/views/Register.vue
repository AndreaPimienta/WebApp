<template>

    <div id="Register">

        <h2> REGISTRO DE CLIENTES</h2>
        <form>
            <div class = "formulario" >
                    
                    <div class="form-group col-md-4">
                        <label for="name">Nombre:</label> <br>
                        <input type="text" class="form-control" id="name" name="name" value="" placeholder="Nombre"/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="last_name">Apellido:</label> <br>
                        <input type="text" class="form-control" id="last_name" name="last_name" value="" placeholder="Apellido"/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="Phone1">Teléfono:</label> <br>
                        <input type="text" class="form-control" id="Phone" name="Phone" value=""  placeholder="Teléfono"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="email">Correo electrónico:</label><br>
                        <input type="text" class="form-control" id="email" name="email" value="" placeholder="correo@gmail.com"/>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="username">username:</label><br>
                        <input type="text" class="form-control" id="username" name="username" value="" placeholder=""/>
                    </div>
                <div class="form-group col-md-4">
                        <label for="password">Contraseña:</label><br>
                        <input type="text" class="form-control" id="password" name="password" value="" placeholder=""/>
                    
                    </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="adress">Dirección:</label><br>
                        <input type="text" class="form-control" id="adress" name="adress" value="" placeholder="Cra. 24 # ..."/>
                    </div>
                
                    
                </div>
            </div>
            <br>
            <div class="botones">
                <div style='text-align:center'>
                    <right>
                        <button type="button" class="btn btn-warning"  v-on:click="makeCliente">Registrarse</button>
                    </right>
                </div>
            </div>
        
        </form>

    </div>

</template>

<script>
import gql from "graphql-tag";
    export default {
        name: "Register",

        data:function(){
            return {
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                address: "",
                phone_number: "",
                balance: 0,
                newCliente: {},
                items: [],
                
            }
        },
        methods:{
            init: function () {
                if (this.$route.name != "Register") {
                    let username = "Juan";
                    this.$router.push({name: "register", params: { username: 'username' }});
                }
            },
            makeCliente: async function () {
                this.phone_number = document.getElementById("Phone").value
                this.first_name = document.getElementById("name").value
                this.last_name = document.getElementById("last_name").value
                this.address = document.getElementById("adress").value
                this.password = document.getElementById("password").value
                this.username = document.getElementById("username").value
                this.email = document.getElementById("email").value

                this.newCliente = {
                                username: this.username,
                                password: this.password,
                                email: this.email,
                                first_name: this.first_name,
                                last_name: this.last_name,
                                address: this.address,
                                phone_number:this.phone_number
                }
                console.log(this.newCliente)    
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($registroUsuario: UsuarioNuevo!) {
                            registro(usuario: $registroUsuario) {
                                mensaje
                            }
                        }`, 
                    variables: {
                        registroUsuario: this.newCliente
                    }

                }).then((result) => {
                    window.confirm("Cliente creado");
                    //let data = result.data.authenticate
                    //data.user_id = jwt_decode(data.access).user_id.toString().padStart(3, "0")

                    //this.$emit('log-in', data, this.user_in.username)
                    this.$router.push({name: "user_auth"})

                }).catch((error) => {
                    alert("Datos incorrectos")
                });           

            },
        },

        created: function(){
            this.username = "Juan"
            //this.$route.params.username
        },
        
    }
</script>

<style>
    body{
        margin: 0%;
        
        background-position: 30%;
    }
    #Register{
        width: 100%;
        height: 100%;
        min-height: 90vh;

        display: flex;
        flex-direction: column;
        justify-content: center;    
        align-items: center;
        background: rgba(0, 0, 0, 0.575);
    }

    #Register h2{
        font-size: 50px;
        color: #4fa1ff;
    }

    #Register span{
        color: crimson;
        
    }
    #Register .formulario {
    color:  #fffdfd;
    align-content: center;
    display: grid;
    grid: auto / auto auto;
    margin-left: 0%;
    font-weight: bold;
    margin-bottom: 1%;
    width: 150%;
    }
    #Register .form-group col-md-4{
    width: 150%
    }
</style>