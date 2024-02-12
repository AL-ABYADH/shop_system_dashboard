<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="container max-w-full">
        <div>
            <p
                v-if="filteredOrders('done').length > 0"
                class="w-full border-b-2 mb-3 sm:pt-2 md:pt-2 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2"
            >
                سجل الطلبات
            </p>
            <div v-for="order in filteredOrders('done')" :key="order.id">
                <ExpandableItem
                    :title="order.customerName"
                    :address="order.customerAddress"
                    :date="order.date"
                    :imageUrl="order.customerImageUrl"
                    :devicesNumber="order.devicesNumber"
                    :phoneNumber="order.customerPhone"
                    :time="order.time"
                    :currency="order.currency"
                    :deliveryPrice="order.deliveryPrice"
                    :orderStatus="order.orderStatus"
                    :totalPrice="order.totalPrice"
                    :devices="order.orderItems"
                    :commission="order.commission"
                    :sellerName="order.sellerName"
                    :sellerAddress="order.sellerAddress"
                    :sellerPhoneNumber="order.sellerPhoneNumber"
                    :orderId="order.id"
                    :key="order.id"
                />
            </div>
            <div
                v-if="filteredOrders('done').length === 0"
                class="flex flex-col items-center justify-center h-96"
            >
                <img
                    src="../../../../../Assets/no_order.png"
                    alt="Empty"
                    class="w-32 h-32 mb-2"
                    style="filter: brightness(150%); /* Green tint */"
                />
                <p class="text-gray-500 text-lg">لا يوجد طلبات هنا</p>
            </div>
            <div class="mt-12"></div>
        </div>
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
    commission: number,
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
    height: 94vh; /* Adjust the percentage as needed */
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
