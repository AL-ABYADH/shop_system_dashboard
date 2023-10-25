<template>
    <div
        class="h-12 w-full bg-white rounded-md shadow-lg shadow-[#E2ECF980] flex justify-between items-center"
        dir="ltr"
    >
        <div class="flex items-center ml-4">
            <a class="text-gray-400 text-xs cursor-pointer" @click="logout"
                >تسجيل الخروج</a
            >
            <div
                class="ml-2 h-8 w-auto rounded-full bg-gray-100 overflow-hidden"
            >
                <img
                    src="../../../Assets/profile.jpg"
                    alt="user"
                    class="w-full h-full object-cover"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        async logout() {
            await this.$inertia.get('/logout')
        },
    },
}
</script>
