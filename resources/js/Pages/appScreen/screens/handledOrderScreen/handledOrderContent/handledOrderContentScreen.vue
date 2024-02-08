<template>
    <div class="container max-w-full">
        <div>
            <p
                class="w-full border-b-2 font-almarai mb-3 sm:pt-2 md:pt-2 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2"
            >
                الطلبات قيد الفحص
            </p>
            <div v-for="order in filteredOrders('testing')" :key="order.id">
                <ExpandableItem
                    :orderId="order.id"
                    :title="order.customerName"
                    :address="order.customerAddress"
                    :date="order.date"
                    :imageUrl="order.customerImageUrl"
                    :devicesNumber="order.devicesNumber"
                    :phoneNumber="order.customerPhone"
                    :time="order.time"
                    :deliveryPrice="order.deliveryPrice"
                    :orderStatus="order.orderStatus"
                    :totalPrice="order.totalPrice"
                    :devices="order.orderItems"
                    :key="order.id"
                    :sellerName="order.sellerName"
                    :sellerAddress="order.sellerAddress"
                    :sellerPhoneNumber="order.sellerPhoneNumber"
                />
            </div>
        </div>
        <div>
            <p
                class="w-full border-b-2 font-almarai mb-3 pt-2 sm:pt-3 md:pt-4 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2"
            >
                الطلبات في انتظار التأكيد
            </p>
            <div v-for="order in filteredOrders('confirming')" :key="order.id">
                <ExpandableItem
                    :orderId="order.id"
                    :title="order.customerName"
                    :address="order.customerAddress"
                    :date="order.date"
                    :imageUrl="order.customerImageUrl"
                    :devicesNumber="order.devicesNumber"
                    :phoneNumber="order.customerPhone"
                    :time="order.time"
                    :deliveryPrice="order.deliveryPrice"
                    :orderStatus="order.orderStatus"
                    :totalPrice="order.totalPrice"
                    :devices="order.orderItems"
                    :key="order.id"
                    :sellerName="order.sellerName"
                    :sellerAddress="order.sellerAddress"
                    :sellerPhoneNumber="order.sellerPhoneNumber"
                />
            </div>
        </div>
        <div class="mt-12"></div>
    </div>
</template>

<script lang="ts">
import ExpandableItem from './orderContent.vue'

type flaws = {
    flaw: string
    severity: string
}

type imageItems = {
    imageUrl: string
}

type orderItems = {
    id: number
    price: number
    currency: string
    flaws: flaws[]
    description: string
    usedProductCondition: string | null
    imageItems: imageItems[]
    expanded: boolean
    isUsed: number
}

type Order = {
    id: number
    customerName: string
    customerAddress: string
    date: string
    deviceName: string
    sellerName: string
    sellerAddress: string
    sellerPhoneNumber: string
    customerImageUrl: string
    currency: string
    devicesNumber: number
    customerPhone: string
    time: string
    totalPrice: number
    deliveryPrice?: number
    orderStatus: string
    orderItems: orderItems[]
}

export default {
    components: {
        ExpandableItem,
    },
    props: {
        orders: {
            type: Array as () => Order[],
            required: true,
        },
    },
    methods: {
        filteredOrders(status) {
            return this.orders.filter((order) => order.orderStatus === status)
        },
    },
}
</script>

<style>
.container {
    overflow-y: scroll; /* Add overflow-y: auto; if you want to hide the scrollbar only when it's not needed */
    height: 95vh; /* Adjust the percentage as needed */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

/* Hide the scrollbar thumb for Webkit browsers */
.container::-webkit-scrollbar {
    width: 0.1rem; /* Set a very small width for the scrollbar */
}

.container::-webkit-scrollbar-thumb {
    background-color: transparent; /* Hide the scrollbar thumb */
}
</style>
