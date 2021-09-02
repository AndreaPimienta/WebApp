<template>

    <table id="customers">

            <tr>
                <td>{{ transacction.id_order }}</td>
                <td>{{ transacction.precio_total }}</td>
                <td>{{ transacction.address_order }}</td>
                <td>{{ estadoOrder }}</td>
            </tr>
        </table>
</template>

<script>
export default {
    name: "TableOrders",

    props: {
        transacction: {
        type: Object,
        required: true,
        // :to="{ name: 'Product', params: { id: product.id } }"
        }
    },

    data () {
        return {
        quantity: 0
        }
    },

    created() {
        console.log(this.product)
    },

    computed: {
        estadoOrder() {
                if (this.transacction.estado_order_id == 1){
                    return 'Compra en proceso';
                } else if (this.transacction.estado_order_id == 2) {
                    return 'Compra realizada, pendiente despacho';
                }else if (this.transacction.estado_order_id == 3) {
                    return 'Compra finalizada';
                } else {
                    return 'Compra cancelada';
                }
            }
    },
}
</script>

<style scoped>
.card:nth-child(3n + 2) {
    margin: 0 5% 10%;
}

.card {
    width: calc(30% - 2px);
    margin-bottom: 10%;
    border: 1px solid #2c3e50;
    border-radius: 10px;
    overflow: hidden;
}

.card img {
    max-width: 100%;
    height: auto;
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