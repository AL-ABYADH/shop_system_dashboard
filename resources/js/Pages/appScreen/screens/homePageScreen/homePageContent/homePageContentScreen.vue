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
      :date="order.date"
      :imageUrl="order.imageUrl"
      :devicesNumber="order.devicesNumber"
      :phoneNumber="order.phoneNumber"
      :time="order.time"
      :checkPrice="order.checkPrice"
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
type Order = {
    id: number
    title: string
    address: string
    date: DateTime
    imageUrl: string
    devicesNumber: number
    phoneNumber: number
    time:DateTime
    delivery: boolean
    delivertPrice: number
    orderStatus: string
    devices:Array
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
  data() {
    return {
      orders: this.orders,
      // orders: [
      //   {
      //     id: 1,
      //     title: "حمود حمادي",
      //     address: "صنعاء - شعوب",
      //     date: "2023-10-07",
      //     imageUrl: "https://picsum.photos/200",
      //     devicesNumber: 2,
      //     phoneNumber: "770893740",
      //     time: "3:35م",
      //     delivery: true,
      //     deliveryPrice: 2000,
      //     orderStatus: "Confirmed",
      //     devices: [
      //       {
      //         deviceName: "Samsung Galaxy S20",
      //         seller: "علي صالح",
      //         address: "صنعاء - الحصبة",
      //         phoneNumber: "771172112",
      //         productId: "ABC123",
      //         price: 10000,
      //         flaws: "شدوخ خفيفة",
      //         description: "هاتف ذو جودة عالية",
      //         isUsed: true,
      //         usedProductCondition: "كالجديد",
      //         pictureLink: "https://example.com/device1-image.jpg",
      //       },
      //       {
      //         deviceName: "iPhone 15 Pro",
      //         seller: "علي صالح",
      //         address: "صنعاء - الحصبة",
      //         phoneNumber: "771172112",
      //         productId: "XYZ789",
      //         price: 8000,
      //         flaws: "بلا مشاكل",
      //         description: "بالكرتون",
      //         isUsed: false,
      //         usedProductCondition: null,
      //         pictureLink: "https://example.com/device2-image.jpg",
      //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     title: "حمود حمادي",
      //     address: "صنعاء - سعوان",
      //     date: "2023-10-07",
      //     imageUrl: "https://picsum.photos/200",
      //     devicesNumber: 2,
      //     phoneNumber: "770893740",
      //     time: "3:35م",
      //     delivery: false,
      //     deliveryPrice: null,
      //     orderStatus: "Awating",
      //     devices: [
      //       {
      //         deviceName: "Samsung Galaxy S20",
      //         seller: "علي صالح",
      //         address: "صنعاء - الحصبة",
      //         phoneNumber: "771172112",
      //         productId: "ABC123",
      //         price: 50000,
      //         flaws: "شدوخ خفيفة",
      //         description: "هاتف ذو جودة عالية",
      //         isUsed: true,
      //         usedProductCondition: "كالجديد",
      //         pictureLink: "https://example.com/device1-image.jpg",
      //       },
      //       {
      //         deviceName: "iPhone 15 Pro",
      //         seller: "علي صالح",
      //         address: "صنعاء - الحصبة",
      //         phoneNumber: "771172112",
      //         productId: "XYZ789",
      //         price: 100000,
      //         flaws: "بلا مشاكل",
      //         description: "بالكرتون",
      //         isUsed: false,
      //         usedProductCondition: null,
      //         pictureLink: "https://example.com/device2-image.jpg",
      //       },
      //     ],
      //   },
      // ],
    };
  },
};
</script>
