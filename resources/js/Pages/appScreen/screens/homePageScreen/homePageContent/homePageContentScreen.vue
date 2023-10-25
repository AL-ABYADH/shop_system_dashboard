<style>
.container {
  overflow-y: scroll; /* Add overflow-y: auto; if you want to hide the scrollbar only when it's not needed */
  height: 86vh; /* Adjust the percentage as needed */
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
  <div class="container max-w-full">
    <ExpandableItem
      v-for="order in orders"
      :key="order.id"
      :title="order.customerName"
      :address="order.customerAddress"
      :date="order.date.toLocaleString()"
      :imageUrl="order.customerImageUrl"
      :devicesNumber="order.devicesNumber"
      :phoneNumber="order.customerPhone"
      :time="order.time.toLocaleString()"
      :deliveryPrice="order.deliveryPrice"
      :orderStatus="order.orderStatus"
      :totalPrice="order.totalPrice"
      :devices="order.orderItems"
    />
  </div>
</template>

<script lang="ts">
import ExpandableItem from "./orderContent.vue"; // Import the ExpandableItem component
import { DateTime } from 'luxon';

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
    date: DateTime
    customerImageUrl: string
    currency: string
    devicesNumber: number
    customerPhone: string
    time:DateTime
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
};
</script>
