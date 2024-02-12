<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="container max-w-full">
        <div>
            <div>
                <p
                    v-if="filteredReturnRequests('awaiting').length > 0"
                    class="w-full border-b-2 mb-3 pt-2 sm:pt-3 md:pt-4 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2"
                >
                    الطلبات في انتظار التأكيد
                </p>
                <div
                    v-for="returnRequest in filteredReturnRequests('awaiting')"
                    :key="returnRequest.id"
                >
                    <ExpandableItem
                        :returnRequestId="returnRequest.id"
                        :title="returnRequest.customerName"
                        :address="returnRequest.customerAddress"
                        :date="returnRequest.date"
                        :imageUrl="returnRequest.customerImageUrl"
                        :devicesNumber="returnRequest.devicesNumber"
                        :phoneNumber="returnRequest.customerPhone"
                        :time="returnRequest.time"
                        :currency="returnRequest.currency"
                        :deliveryPrice="returnRequest.deliveryPrice"
                        :returnRequestStatus="returnRequest.returnRequestStatus"
                        :totalPrice="returnRequest.totalPrice"
                        :devices="returnRequest.returnRequestItems"
                        :commission="returnRequest.commission"
                        :key="returnRequest.id"
                        :sellerName="returnRequest.sellerName"
                        :sellerAddress="returnRequest.sellerAddress"
                        :sellerPhoneNumber="returnRequest.sellerPhoneNumber"
                    />
                </div>
            </div>
            <p
                v-if="filteredReturnRequests('evaluating').length > 0"
                class="w-full border-b-2 mb-3 sm:pt-2 md:pt-2 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2"
            >
                الطلبات قيد التحقق
            </p>
            <div
                v-for="returnRequest in filteredReturnRequests('evaluating')"
                :key="returnRequest.id"
            >
                <ExpandableItem
                    :returnRequestId="returnRequest.id"
                    :title="returnRequest.customerName"
                    :address="returnRequest.customerAddress"
                    :date="returnRequest.date"
                    :imageUrl="returnRequest.customerImageUrl"
                    :devicesNumber="returnRequest.devicesNumber"
                    :phoneNumber="returnRequest.customerPhone"
                    :time="returnRequest.time"
                    :currency="returnRequest.currency"
                    :deliveryPrice="returnRequest.deliveryPrice"
                    :returnRequestStatus="returnRequest.returnRequestStatus"
                    :totalPrice="returnRequest.totalPrice"
                    :devices="returnRequest.returnRequestItems"
                    :commission="returnRequest.commission"
                    :key="returnRequest.id"
                    :sellerName="returnRequest.sellerName"
                    :sellerAddress="returnRequest.sellerAddress"
                    :sellerPhoneNumber="returnRequest.sellerPhoneNumber"
                />
            </div>
        </div>
        <div
            v-if="
                filteredReturnRequests('awaiting').length === 0 &&
                filteredReturnRequests('evaluating').length === 0
            "
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
</template>

<script lang="ts">
import ExpandableItem from './returnRequestContent.vue'

type flaws = {
    flaw: string
    severity: string
}

type imageItems = {
    imageUrl: string
}

type returnRequestItems = {
    id: number
    price: number
    currency: string
    flaws: flaws[]
    description: string
    usedProductCondition: string | null
    imageItems: imageItems[]
    expanded: boolean
    isUsed: number
    reason: string
}

type returnRequest = {
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
    returnRequestStatus: string
    returnRequestItems: returnRequestItems[]
}

export default {
    components: {
        ExpandableItem,
    },
    props: {
        returnRequests: {
            type: Array as () => returnRequest[],
            required: true,
        },
    },
    methods: {
        filteredReturnRequests(status) {
            return this.returnRequests.filter(
                (returnRequest) => returnRequest.returnRequestStatus === status
            )
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
