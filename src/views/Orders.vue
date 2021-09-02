<template>
    <div id="Orders">

        <h2> Hola!  <span> {{username}}, </span>estas son las compras que has realizado!</h2>
        <br />
<!--         <table id="customers">
            <tr>
                <th>Orden</th>
                <th>Precio Total</th>
                <th>Direccion</th>
                <th>Estado</th>
            </tr>

            <tr>
                <section class="products-grid">
                    <TableOrders
                        v-for="transacction in consultarOrdenesCliente"
                        :key="transacction.id_order"
                        :transacction="transacction"
                    />
                </section>
            </tr>
        </table> -->

        

        <table id="customers">
            <tr>
                <th>Orden</th>
                <th>Precio Total</th>
                <th>Direccion</th>
                <th>Estado</th>
            </tr>

            <tr v-for="transacction in consultarOrdenesCliente" :key="transacction.id_order">
                <td>{{ transacction.id_order }}</td>
                <td>{{ transacction.precio_total }}</td>
                <td>{{ transacction.address_order }}</td>
                <td>{{ transacction.estado_order_id }}</td>
            </tr>
        </table>
        <br />

        
    </div>
</template>

<script>
import TableOrders from '@/components/TableOrders'
import gql from "graphql-tag";
    export default {
        name: "Orders",
        components: { TableOrders },

        data:function(){
            return {
                username: "none",
                consultarOrdenesCliente: [],
                estado: 0,
                respuesta: "",
            }
        },

        created: function(){
            this.username = this.$route.params.username
        },
        computed: {
            
        },
        methods: {
/*             estadoOrder: function() {
                this.estado = this.transacction.estado_order_id;
                if (this.estado == 1){
                    this.respuesta = "Compra en proceso";
                } else if (this.estado == 2) {
                    this.respuesta = "Compra en proceso";
                }else if (this.estado == 3) {
                    this.respuesta = "Compra en proceso";
                } else {
                    this.respuesta = "Compra en proceso";
                }
                console.log(this.respuesta)
                return this.respuesta
            } */
        },
        apollo: {
                consultarOrdenesCliente: {
                query: gql`
                    query ($consultarOrdenesClienteId: Int!) {
                    consultarOrdenesCliente(id: $consultarOrdenesClienteId) {
                        id_order
                        precio_total
                        estado_order_id
                        address_order
                        id_person
                    }
                    }`,
                variables() {
                    return {consultarOrdenesClienteId: parseInt(localStorage.getItem("user_id"))};
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
    #Orders{
        width: 100%;
        margin-top: 100px;


        height: auto;
        min-height: 150vh;
        display: flex;
        flex-direction: column;
        justify-content: center;    
        align-items: center;
        background: rgb(255, 253, 253);
        margin-bottom: 180px;
    }

    #Orders h2{
        font-size: 50px;
        margin-right: 150px;
        margin-left: 80px;
        color: #4fa1ff;
    }
    #Orders h3{
        font-size: 50px;
        margin-right: 150px;
        margin-left: 80px;

        color: #4fa1ff;
    }

    #Orders span{
        color: crimson;
        font-weight: bold;
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
    #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin-bottom: 180px;
    }

    #customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    #customers tr:nth-child(even){background-color: #f2f2f2;}

    #customers tr:hover {background-color: #ddd;}

    #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
    }
    
</style>