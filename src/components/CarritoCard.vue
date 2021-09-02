<template>
    <div class="card">
        <h4>{{ product.id_producto }}</h4>
        <h4>{{ product.cantidad }}</h4>
        <h4>{{ product.valor_total }}</h4>
        <hr>
        <button @click="deleteToCart()" >Eliminar producto</button>
    </div>
</template>

<script>
export default {
    name: "CarritoCard",

    props: {
        product: {
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

/*     computed: {
        productPrice() {
        return this.product.precio + ' COP'
        }
    }, */

    methods: {
        deleteToCart(){
        this.$emit('delete', {
            id_order: parseInt(localStorage.getItem("order")),
            id_producto: this.product.id_producto,
            id:  parseInt(localStorage.getItem("user_id"))
        })
        }
    }
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
</style>