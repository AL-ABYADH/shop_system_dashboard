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

<template>
  <div  class="container max-w-full">
    <div>
    <p
      class="w-full border-b-2 font-almarai mb-3 sm:pt-2 md:pt-2 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2"
    >
      الطلبات قيد الفحص
    </p>
    <div v-for="order in filteredOrders('testing')" :key="order.id">
      <!-- Render order details for Confirmed orders -->
      <ExpandableItem
      :key="order.id"
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
      <!-- Render order details for Awaiting orders -->
      <ExpandableItem
      :key="order.id"
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
    />
    </div>
  </div>
  </div>
  
</template>

<script lang="ts">
import ExpandableItem from "./orderContent.vue"; // Import the ExpandableItem component


type flaws = {
  flaw: string;
  severity: string;
}

type imageItems = {
  imagesUrl: string;
}

type orderItems = {
  id: number;
  deviceName: string;
  sellerName: string;
  sellerAddress: string;
  sellerPhoneNumber: string;
  price: number;
  currency: string;
  flaws: flaws[];
  description: string;
  usedProductCondition: string | null;
  imageItems: imageItems[];
  // Add other properties as needed
}
type Order = {
    id: number
    customerName: string
    customerAddress: string
    date: string
    customerImageUrl: string
    currency: string
    devicesNumber: number
    customerPhone: string
    time:string
    totalPrice: number
    deliveryPrice?: number
    orderStatus: string
    orderItems:orderItems[]
}

export default {
  components: {
    ExpandableItem, // Register the component
  },
  props: {
        orders: {
            type: Array as () => Order[],
            required: true,
        },
    },
  methods: {
    filteredOrders(status) {
      return this.orders.filter((order) => order.orderStatus === status);
    },
  },
};
</script>
