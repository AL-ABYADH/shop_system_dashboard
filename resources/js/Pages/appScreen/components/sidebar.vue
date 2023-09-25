<template>
  <aside dir="rtl">
    <div
      class="overflow-y-hidden overflow-x-hidden h-screen flex flex-col transition-all duration-300 ease-in-out bg-white rounded-md shadow-lg shadow-[#E2ECF980] w-auto ">
      <section class="w-full flex items-center justify-between border-b border-gray-200 px-2 py-4 relative">
        <div class="rounded-full bg-white p-1 cursor-pointer duration-150 ease-in-out block" @click="toggleSidebarWidth">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
        <span class="text-theme-darkblue mr-6 text-lg block overflow-hidden whitespace-nowrap w-full">
          السوق
        </span>
      </section>
      <section class="w-full py-4">
        <div v-for="item in sidebarItems" :key="item.id" class="w-full flex mr-1 rounded-md">
          <div @click="changeContent(item.id)" :class="{
            'text-slate-500 bg-primary-opacity': selectedItem === item.id,
          }" class="flex mb-1 px-3 py-2 duration-200 transform rounded-lg w-full cursor-pointer ml-2"> 
            <span class="text-sm overflow-hidden block whitespace-nowrap w-full pr-4">{{ item.label }}</span>
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>
  
<script lang="ts">
declare var location: any;
declare var localStorage: any;

export default {
  data() {
    return {
      selectedItem: "",
      isSidebarClosed: false,
      sidebarItems: [
        {
          id: "home",
          label: "الرئيسية",
        },
        {
          id: "admin-accounts",
          label: "حسابات المشرفين",
        },
        // Add more items here
      ],
      
    };
  },

  created() {
    // Retrieve the selected item from local storage
    const storedItem = localStorage.getItem("selectedItem");
    const isSidebarClosed = localStorage.getItem("isSidebarClosed");
    if (storedItem) {
      this.selectedItem = storedItem;
    }
    if (isSidebarClosed) {
      this.isSidebarClosed = isSidebarClosed === "true";
    }
  },

  methods: {
    changeContent(content) {
      if (content === this.selectedItem) {
        // Reload the page when the current item is clicked
        location.reload();
      }
      this.$emit("content-change", content);
      this.selectedItem = content;
      localStorage.setItem("selectedItem", content);
    },
    toggleSidebarWidth() {
      this.isSidebarClosed = !this.isSidebarClosed;
      localStorage.setItem("isSidebarClosed", this.isSidebarClosed.toString());
      this.$emit("toggle-sidebar-width");
    },
  },
};
</script>
  