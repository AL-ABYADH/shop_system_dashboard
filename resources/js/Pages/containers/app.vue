<style>
body {
  direction: rtl;
  background-color: #f5f5f5;
  margin-top: 10px;
  margin-right: 10px;

}

#sidebar {
  transition: width 0.3s ease-in-out;
}
</style>

<template>
  <div class="flex gap-5 fixed w-full">
    <div
      id="sidebar"
      class="md:w-1/4"
      :style="{ width: isSidebarClosed ? '50px' : '250px' }"
    >
      <sidebarVue
        @toggle-sidebar-width="toggleSidebarWidth"
        @content-change="changeContent"
      />
    </div>

    <div
      :style="{ width: isSidebarClosed ? '100%' : '100%' }"
      class="sm:block w-full md:w-3/4 ml-5"
    >
      <headerVue />
      <contentVue :selectedContent="selectedContent" />
    </div>
  </div>
</template>

<script lang="ts">
import '../../../css/font.css';
import headerVue from '../components/appComponent/header.vue';
import sidebarVue from '../components/appComponent/sidebar.vue';
import contentVue from '../components/appComponent/content.vue';

declare var localStorage: any;

export default {
  data() {
    return {
      selectedContent: "home",
      isSidebarClosed: false, // Set the default selected content
    };
  },

  components: {
    headerVue,
    sidebarVue,
    contentVue,
  },

  created() {
    const storedContent = localStorage.getItem("selectedContent");
    if (storedContent) {
      this.selectedContent = storedContent;
    }
    const isClosed = localStorage.getItem("isSidebarClosed");
    if (isClosed !== null) {
      this.isSidebarClosed = isClosed === "true";
    }

    // Add screen size detection to the created hook
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
      // Update the selected content based on the sidebar click
      this.selectedContent = content;
      // Store the selected content in localStorage
      localStorage.setItem("selectedContent", content);
    },
    toggleSidebarWidth() {
      this.isSidebarClosed = !this.isSidebarClosed;
      localStorage.setItem("isSidebarClosed", this.isSidebarClosed.toString());
    },
    checkScreenSize() {
      const screenWidth = window.innerWidth;
      const threshold = 768; // You can adjust this threshold as needed

      if (screenWidth < threshold) {
        // Screen is small, set a value or perform an action for small screens
        this.isSidebarClosed = true;
      } else{
        this.isSidebarClosed = false;
      }
    },
  },
};
</script>
