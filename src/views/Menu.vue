<template>
    <div id="Menu">
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2> Hola!  <span> , </span>este es nuestro menú</h2>
        

        <section v-if="products.length > 0" class="products-grid">
            <ProductCard
                v-for="product in carta"
                :key="product.id_producto"
                :product="product"
                @add="addToCart($event)"
            />
        </section>
    </div>
</template>

<script>
import gql from "graphql-tag";
import ProductCard from '@/components/ProductCard'
    export default {
        name: "Menu",
        components: { ProductCard },

        data () {
            return {
            id_producto: 0,
            new_carta:{},
            carta: [],
            data1: {},
            cartaIdProducto: {},
            imagen: "",
            products: [
                {
                id: 'fasdfasdf',
                name: 'Producto 1',
                price: 25000,
                imageSrc: 'https://i.imgur.com/6MuObMP.jpg',
                limit: 40
                },
                {
                id: 't34t4rgr',
                name: 'Producto 2',
                price: 75000,
                imageSrc: 'https://i.imgur.com/6MuObMP.jpg',
                limit: 4
                },
                {
                id: 'jghj67jg',
                name: 'Producto 3',
                price: 215000,
                imageSrc: 'https://i.imgur.com/6MuObMP.jpg',
                limit: 10
                },
                {
                id: '65thfghfgh',
                name: 'Producto 4',
                price: 15000,
                imageSrc: 'https://i.imgur.com/6MuObMP.jpg',
                limit: 20
                },
                {
                id: 'lkd45t4oi5',
                name: 'Producto 5',
                price: 5000,
                imageSrc: 'https://i.imgur.com/6MuObMP.jpg',
                limit: 3
                },
                {
                id: 'gsdfigsoij43',
                name: 'Producto 6',
                price: 35000,
                imageSrc: 'https://i.imgur.com/6MuObMP.jpg',
                limit: 8
                }
            ],
            cart: []
            }
        },
        methods: {
            init: function () {
            
            },
        
            addToCart: async function (data) {
                console.log(data)
                this. data1 = data
                console.log(this.data1)
                await this.$apollo.mutate({
                        mutation: gql`
                            mutation ($agregarProductoCarritoProducto: AgregarProductoInput!) {
                                agregarProductoCarrito(producto: $agregarProductoCarritoProducto) {
                                    message
                                    order
                                }
                            }`, 
                        variables: {
                            agregarProductoCarritoProducto: data
                        }

                    }).then((result) => {
                        window.confirm("Producto agregado");
                        let info = result.data.agregarProductoCarrito
                        console.log(info)
                        localStorage.setItem("order", info.order);
                        //let data = result.data.authenticate
                        //data.user_id = jwt_decode(data.access).user_id.toString().padStart(3, "0")

                        //this.$emit('log-in', data, this.user_in.username)
                        

                    }).catch((error) => {
                        alert("No hay suficientes productos en stock")
                    });
            },
            
        },
        apollo: {
                carta: {
                query: gql`
                    query ($cartaIdProducto: BucarIdInput!) {
                        carta(id_producto: $cartaIdProducto) {
                            id_producto
                            nombre
                            precio
                            descripcion
                            cantidad
                            categoria
                            imagen
                        }
                    }`,
                variables() {
                    return {cartaIdProducto: {id_producto: 1000},};
                }
            },
        }
    }
</script>

<style>
    #Menu{
        width: 100%;
        height: auto;
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;    
        align-items: center;
        background: rgb(255, 255, 255);
    }

    #Menu h2{
        font-size: 50px;
        color: #4fa1ff;
    }

    #Menu span{
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
</style>