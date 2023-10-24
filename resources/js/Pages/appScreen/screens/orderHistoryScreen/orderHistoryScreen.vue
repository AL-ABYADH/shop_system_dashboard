<style src="../../../../../css/app.css"></style>

<template>
  <div class="flex gap-5 fixed w-screen">
    <!-- Sidebar -->
    <div id="sidebar" class="md:w-1/4" :style="{ width: isSidebarClosed ? '50px' : '250px' }">
      <sidebarVue @toggle-sidebar-width="toggleSidebarWidth" />
    </div>

    <!-- Main Content -->
    <div :style="{ width: isSidebarClosed ? '100%' : '100%' }" class="w-full md:w-3/4 ml-5 overflow-y-auto">
      <headerVue />
      <div>
        <p
          class="w-full border-b-2 font-almarai pt-2 sm:pt-3 md:pt-4 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2  ">
          سجل الطلبات
        </p>
      </div>
      <div class="mt-5 w-full md:pt-0 md:pl-5">
        <orderHistoryContentScreen :orders="this.orders"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import orderHistoryContentScreen from './orderHistoryContent/orderHistoryContentScreen.vue';
import sidebarVue from '../../components/sidebar.vue';
import headerVue from '../../components/header.vue';


export default {
  props: {
        orders: Array,
    },
  data() {
    return {
      isSidebarClosed: false,
    };
  },

  components: {
    headerVue,
    sidebarVue,
    orderHistoryContentScreen,
  },

  created() {
    // Initialize isSidebarClosed from localStorage or use the default value
    const isClosed = localStorage.getItem("isSidebarClosed");
    if (isClosed !== null) {
      this.isSidebarClosed = isClosed === "true";
    }

    // Check the screen size
    this.checkScreenSize();

    // Add a window resize event listener to update when the screen size changes
    window.addEventListener('resize', this.checkScreenSize);
  },

  beforeDestroy() {
    // Remove the window resize event listener when the component is destroyed
    window.removeEventListener('resize', this.checkScreenSize);
  },

  methods: {
    toggleSidebarWidth() {
      // Toggle the value
      this.isSidebarClosed = !this.isSidebarClosed;
      // Store the updated value in localStorage
      localStorage.setItem("isSidebarClosed", this.isSidebarClosed.toString());
    },

    checkScreenSize() {
      const screenWidth = window.innerWidth;
      const threshold = 768;

      if (screenWidth < threshold) {
        // Close the sidebar if the screen is small
        this.isSidebarClosed = true;
      } else if (localStorage.getItem("isSidebarClosed") === "true") {
        // If localStorage indicates the sidebar should be closed, close it
        this.isSidebarClosed = true;
      } else {
        this.isSidebarClosed = false;
      }
    },
  },
};
</script>