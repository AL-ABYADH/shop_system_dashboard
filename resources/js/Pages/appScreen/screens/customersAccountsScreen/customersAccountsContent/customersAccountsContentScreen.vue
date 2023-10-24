<style>
.bt {
    text-align: center;
    vertical-align: middle;
}
.h-96 {
    height: 40rem;
}
</style>

<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="app" class="md:pt-1 bg-white rounded-md">
        <div class="overflow-y-auto h-96 md:h-96">
            <table class="w-full divide-primary divide-y-2">
                <thead>
                    <tr>
                        <th
                            class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-xs md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            اسم المستخدم
                        </th>
                        <th
                            class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            رقم الهاتف
                        </th>
                        <th
                            class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            العنوان
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="customer in customers"
                        :key="customer.id"
                        class="odd:bg-white even:bg-primary-opacity"
                    >
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/3 md:w-1/4 lg:w-1/6"
                        >
                            {{ customer.fullName }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ customer.phoneNumber }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ customer.address }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
type Customer = {
    id: number
    fullName: string
    phoneNumber: number
    address: string
}

export default {
    props: {
        customers: {
            type: Array as () => Customer[],
            required: true,
        },
    },
}
</script>
