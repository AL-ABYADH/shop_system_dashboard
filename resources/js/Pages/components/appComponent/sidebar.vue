<template>
    <aside dir="rtl">
        <div class="overflow-y-auto h-screen w-full bg-white rounded-md shadow-lg shadow-[#E2ECF980] ml-3 ">
            <section class="w-full flex 
                items-center justify-between border-b border-gray-200 px-2 py-4 relative">
                <div class="rounded-full bg-white p-1 cursor-pointer duration-150 ease-in-out block"
                    @click="toggleSidebarWidth">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                        </path>
                    </svg>
                    
                </div>
                <span
                    class="text-theme-darkblue mr-6 text-lg block overflow-hidden whitespace-nowrap w-full">السوق</span>

            </section>
            <section class="w-full pr-4 py-4">
                <div class="w-full flex">
                    <div @click="changeContent('home')" ref="homeItem"
                        :class="{ 'bg-slate-300 text-slate-500': selectedItem === 'home' }"
                        class="flex mb-1 px-3 py-2 duration-200 transform rounded-lg w-full cursor-pointer ml-0">
                        <img @click="changeContent('home')" ref="homeItem" :="{ 'text-slate-500': selectedItem === 'home' }"
                            class="h-5" src="../../../Assets/HomeScreen.svg" alt="icon">

                        <span class="text-sm overflow-hidden block whitespace-nowrap w-full pr-4">الرئيسية</span>
                    </div>
                    <div @click="changeContent('home')" ref="homeItem" :class="{ 'bg-slate-500': selectedItem === 'home' }"
                        class="h-10 mr-1 mb-1 w-1 rounded-r-lg "></div>
                </div>
                <div class="w-full flex">
                    <div @click="changeContent('admin-accounts')" ref="adminAccountsItem"
                        :class="{ 'bg-slate-300': selectedItem === 'admin-accounts' }"
                        class="flex mb-1 px-3 py-2 duration-200 transform rounded-lg w-full hover:text-slate-500 cursor-pointer ml-0">
                        <img class="h-5" src="../../../Assets/HomeScreen.svg" alt="icon">
                        <span
                            class="font-regular text-sm overflow-hidden block whitespace-nowrap w-full hover:text-slate-500 pr-4">حسابات
                            المشرفين</span>
                    </div>
                    <div @click="changeContent('admin-accounts')" ref="adminAccountsItem"
                        :class="{ 'bg-slate-500': selectedItem === 'admin-accounts' }"
                        class="h-10 mr-1 mb-1 w-1 rounded-r-lg"></div>
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
        };
    },

    created() {
        // Retrieve the selected item from local storage
        const storedItem = localStorage.getItem("selectedItem");
        if (storedItem) {
            this.selectedItem = storedItem;
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
            this.isSidebarClosed=!this.isSidebarClose

        },

    },
};

</script>