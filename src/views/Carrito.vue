<template>
    <div id="Carrito">

        <h2> !Estás a un paso de completar tu compra!</h2> 
        <section class="products-grid">
            <CarritoCard
                v-for="product in consultarCarritoCliente"
                :key="product.id_detalles_order"
                :product="product"
                @delete="deleteToCart($event)"
            />
        </section> <br />


        <label for="adress">Dirección:</label><br>
        <input type="text" class="form-control" id="adress" name="adress" value="" placeholder="Cra. 24 # ..."/><br />
        <button type="button" class="btn btn-warning"  v-on:click="cleanCarrito">Vaciar carrito</button> <br />
        <button type="button" class="btn btn-warning"  v-on:click="makeCompra">Comprar</button>

    </div>
</template>

<script>
import gql from "graphql-tag";
import CarritoCard from '@/components/CarritoCard'
    export default {
        name: "Carrito",
        components: { CarritoCard },

        data:function(){
            return {
                consultarCarritoCliente: [],
                username: "none",
                newData1: {},
                newData2: {},
                id_order:0,
                id:0,
                address_order: "",
                total: 0,
            }
        },

        created: function(){
            this.username = this.$route.params.username
        
        },
        beforeCreate: function() {
            console.log(2)
            
        },
        methods:{
            init: function () {
                if (this.$route.name != "Carrito") {
                    this.$router.push({name: "carrito", params: { username: 'username' }});
                }
            },
            makeCompra: async function () {
                this.id_order= parseInt(localStorage.getItem("order")),
                this.id= parseInt(localStorage.getItem("user_id")),
                this.address_order= document.getElementById("adress").value

                this.newData1 = {
                                "id_order": this.id_order,
                                "id": this.id,
                                "address_order": this.address_order
                }
                console.log(this.newData1)
                await this.$apollo.mutate({
                        mutation: gql`
                            mutation ($finalizarCompraFinalizar: FinalizarCompraInput!) {
                                finalizarCompra(finalizar: $finalizarCompraFinalizar) {
                                    message
                                }
                            }`, 
                        variables: {
                            finalizarCompraFinalizar: this.newData1
                        }
                    }).then((result) => {
                        window.confirm("Compra realizada");
                        localStorage.removeItem("order");
                        window.location.reload();                      

                    }).catch((error) => {
                        alert("Houston tenemos un problema")
                    });
            },
            cleanCarrito: async function () {
                this.id_order= parseInt(localStorage.getItem("order")),
                this.id= parseInt(localStorage.getItem("user_id")),

                this.newData2 = {
                                "id_order": this.id_order,
                                "id": this.id,
                }
                console.log(this.newData1)
                await this.$apollo.mutate({
                        mutation: gql`
                            mutation ($cancelarCompraCancelar: CancelarCompraInput!) {
                            cancelarCompra(cancelar: $cancelarCompraCancelar) {
                                message
                            }
                            }`, 
                        variables: {
                            cancelarCompraCancelar: this.newData2
                        }
                    }).then((result) => {
                        window.confirm("Compra cancelada");
                        localStorage.removeItem("order");
                        window.location.reload();                        

                    }).catch((error) => {
                        alert("Houston tenemos un problema")
                    });
            },
            deleteToCart: async function (data) {

                console.log(data)
                await this.$apollo.mutate({
                        mutation: gql`
                            mutation ($eliminarProductoCarritoEliminar: EliminarProductoInput!) {
                            eliminarProductoCarrito(eliminar: $eliminarProductoCarritoEliminar) {
                                message
                            }
                            }`, 
                        variables: {
                            eliminarProductoCarritoEliminar: data
                        }
                    }).then((result) => {
                        window.confirm("Producto eliminado");
                        window.location.reload();                        

                    }).catch((error) => {
                        alert("Houston tenemos un problema")
                    });
            },

            
        },
        apollo: {
                consultarCarritoCliente: {
                query: gql`
                    query ($consultarCarritoClienteConsulta: ConsultarOrdenClienteInput!) {
                        consultarCarritoCliente(consulta: $consultarCarritoClienteConsulta) {
                            id_detalles_order
                            id_producto
                            valor_total
                            cantidad
                            id_order_id
                        }
                    }`,
                variables() {
                    return {consultarCarritoClienteConsulta: {id: parseInt(localStorage.getItem("user_id")), 
                    id_order:parseInt(localStorage.getItem("order"))},};
                }
            },
        }
    }
</script>

<style>
    body{
        margin: 0%;
        background-image: url("../assets/ceviche.jpg");
        background-position: 30%;
    }
    #Carrito{
        width: 100%;
        min-height: 160vh;
        height: auto;
        
        flex-direction: column;

        display: flex;
        justify-content: center;    
        align-items: center;
        background: rgb(255, 255, 255);
        margin-bottom: 0%;
    }

    #Carrito h2{
        font-size: 50px;
        color: #2BAEB7;
    }
    .products-grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        padding: 40px 10%;
        width: 100%;
        box-sizing: border-box;
    }

    #Carrito span{
        color: #2BAEB7;
        font-weight: bold;
    }
    #Carrito .formulario {
    color:  #000000;
        align-content: center;
        display: grid;
        grid: auto / auto auto;
        margin-left: 0%;
        font-weight: bold;
        margin-bottom: 1%;
        width: 150%;
    }
</style>