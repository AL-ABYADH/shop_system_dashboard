<template>
  <aside dir="rtl">
    <div
      class="overflow-y-hidden overflow-x-hidden h-screen flex flex-col transition-all duration-300 ease-in-out bg-white rounded-md shadow-lg shadow-[#E2ECF980] w-auto"
    >
      <section class="w-full flex items-center justify-between border-b border-gray-200 px-2 py-4 relative">
        <div
          class="rounded-full bg-white p-1 cursor-pointer duration-150 ease-in-out block"
          @click="toggleSidebarWidth"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <span class="text-theme-darkblue mr-6 text-lg block overflow-hidden whitespace-nowrap w-full">
          السوق
        </span>
      </section>
      <section class="w-full py-4">
        <div v-for="item in sidebarItems" :key="item.id" class="w-full flex mr-1 rounded-md">
          <template v-if="!isSidebarClosed">
            <div
              @mouseover="showTooltip(item.id)"
              @mouseout="hideTooltip(item.id)"
              @click="changeContent(item.id)"
              :class="{
                'text-slate-500 bg-primary-opacity': selectedItem === item.id,
              }"
              class="flex mb-1 px-3 py-2 duration-200 transform rounded-lg w-full cursor-pointer ml-2"
              data-toggle="tooltip"
      data-placement="right"
      :title="item.label"
            >
            <div class="flex">
              <i :class="item.icon"></i>
            </div>
            
            <span
      class="text-sm overflow-hidden block whitespace-nowrap w-full pr-4"
      
    >
      {{ item.label }}
    </span>            
  </div>
          </template>
          <template v-else>
            <div
              @click="changeContent(item.id)"
              :class="{
                'text-slate-500 bg-primary-opacity': selectedItem === item.id,
              }"
              class="flex mb-1 px-3 py-2 duration-200 transform rounded-lg w-10 cursor-pointer ml-2"
            >
            <div class="flex"
      data-toggle="tooltip"
      data-placement="right"
      :title="item.label">
              <i :class="item.icon"></i> 
            </div>
                     
            </div>
          </template>
        </div>
      </section>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: "",
      isSidebarClosed: false,
      sidebarItems: [
        {
          id: "home",
          label: "الرئيسية",
          icon: "fa fa-home", // Font Awesome icon class
        },
        {
          id: "handled-orders",
          label: "الطلبات الموكلة",
          icon: "fa fa-shopping-cart", // Font Awesome icon class
        },
        {
          id: "orders-history",
          label: "سجل الطلبات",
          icon: "fa fa-history", // Font Awesome icon class
        },
        {
          id: "admin-accounts",
          label: "حسابات المشرفين",
          icon: "fa fa-user", // Font Awesome icon class
        },
        {
          id: "sellers-accounts",
          label: "حسابات البائعين",
          icon: "fa fa-user-o", // Font Awesome icon class
        },
        {
          id: "customers-accounts",
          label: "حسابات المستخدمين",
          icon: "fa fa-users ", // Font Awesome icon class
        },
        // Add more items here
      ],
    };
  },

  created() {
    // Retrieve the selected item and sidebar state from local storage
    const storedItem = localStorage.getItem("selectedItem");
    const isSidebarClosed = localStorage.getItem("isSidebarClosed");
    if (storedItem) {
      this.selectedItem = storedItem;
    }
    if (isSidebarClosed) {
      this.isSidebarClosed = isSidebarClosed === "true";
    }

    // Apply the sidebar state based on localStorage
    this.applySidebarState();

    // Add an event listener for the 'unload' event to save sidebar state
    window.addEventListener('unload', this.saveSidebarStateUnload);
  },

  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('unload', this.saveSidebarStateUnload);
  },

  methods: {
    changeContent(content) {
      if (content === this.selectedItem) {
        // Reload the page when the current item is clicked
        location.reload();
      }
      this.selectedItem = content;
      this.saveSidebarState();
      this.$emit("content-change", content);
    },
    toggleSidebarWidth() {
      this.isSidebarClosed = !this.isSidebarClosed;
      this.saveSidebarState();
      this.$emit("toggle-sidebar-width");
    },
    saveSidebarState() {
      // Save the sidebar state to local storage
      localStorage.setItem("selectedItem", this.selectedItem);
      localStorage.setItem("isSidebarClosed", this.isSidebarClosed.toString());
    },
    applySidebarState() {
      // Apply the sidebar state when the component is created
      if (this.isSidebarClosed) {
        this.toggleSidebarWidth();
      }
    },
    saveSidebarStateUnload() {
      // Save sidebar state before the page is unloaded
      this.saveSidebarState();
    },
    showTooltip(itemId) {
      // Find the item by its ID and trigger the tooltip
      const item = this.sidebarItems.find(item => item.id === itemId);
      if (item) {
        // Trigger the tooltip
        const tooltipElement = document.querySelector(`[data-toggle="tooltip"][title="${item.label}"]`);
        if (tooltipElement) {
          $(tooltipElement).tooltip('show');
        }
      }
    },

    hideTooltip(itemId) {
      // Find the item by its ID and hide the tooltip
      const item = this.sidebarItems.find(item => item.id === itemId);
      if (item) {
        // Hide the tooltip
        const tooltipElement = document.querySelector(`[data-toggle="tooltip"][title="${item.label}"]`);
        if (tooltipElement) {
          $(tooltipElement).tooltip('hide');
        }
      }
    },
    
  },
  mounted() {
    // Initialize Bootstrap tooltips when the component is mounted
    $('[data-toggle="tooltip"]').tooltip();
  },
};
</script>
