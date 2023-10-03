<style src="../../../../../css/app.css"></style>

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
            <div
                class="w-full border-b-2 pt-5 border-primaryColor text-primary pb-2 text-xl"
            >
                jjjjjjjj
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="../controllers/appScreens"></script>
