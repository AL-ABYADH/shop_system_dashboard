<style src="../../../../../css/app.css"></style>

<template>
  <div class="flex gap-5 fixed w-screen">
    <!-- Sidebar -->
    <div id="sidebar" class="md:w-1/4" :style="{ width: isSidebarClosed ? '50px' : '250px' }">
      <sidebarVue @toggle-sidebar-width="toggleSidebarWidth" @content-change="changeContent" />
    </div>

    <!-- Main Content -->
    <div :style="{ width: isSidebarClosed ? '100%' : '100%' }" class="w-full md:w-3/4 ml-5 overflow-y-auto">
      <headerVue />
      <div>
        <p
          class="w-full border-b-2 font-almarai pt-2 sm:pt-3 md:pt-4 border-primary text-primary text-base sm:text-lg md:text-xl sm:pb-2  ">
          الطلبات المتاحة
        </p>
      </div>
      <div class="mt-5 w-full md:pt-0 md:pl-5">
        <homePageContentScreen/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import homePageContentScreen from './homePageContent/homePageContentScreen.vue';
import sidebarVue from '../../components/sidebar.vue';
import headerVue from '../../components/header.vue';

export default {
  data() {
    return {
      selectedContent: "home",
      isSidebarClosed: false,
    };
  },

  components: {
    headerVue,
    sidebarVue,
    homePageContentScreen,
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
    changeContent(content) {
      this.selectedContent = content;
      // Store the selected content in localStorage
      localStorage.setItem("selectedContent", content);
    },

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