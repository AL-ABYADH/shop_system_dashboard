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
      :title="order.title"
      :address="order.address"
      :date="order.date.toLocaleString()"
      :imageUrl="order.imageUrl"
      :devicesNumber="order.devicesNumber"
      :phoneNumber="order.phoneNumber"
      :time="order.time.toLocaleString()"
      :delivery="order.delivery"
      :deliveryPrice="order.deliveryPrice"
      :orderStatus="order.orderStatus"
      :devices="order.devices"
    />
  </div>
</template>

<script lang="ts">
import ExpandableItem from "./orderContent.vue"; // Import the ExpandableItem component
import { DateTime } from 'luxon';


interface Device {
  deviceName: string;
  seller: string;
  address: string;
  phoneNumber: string;
  productId: string;
  price: number;
  flaws: string;
  description: string;
  isUsed: boolean;
  usedProductCondition: string | null;
  pictureLink: string;
  // Add other properties as needed
}
type Order = {
    id: number
    title: string
    address: string
    date: DateTime
    imageUrl: string
    devicesNumber: number
    phoneNumber: string
    time:DateTime
    delivery: boolean
    deliveryPrice?: number
    orderStatus: string
    devices:Device[]
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
