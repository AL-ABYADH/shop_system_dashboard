<style>
.bt {
    text-align: center;
    vertical-align: middle;
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
                            class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            اسم المشرف
                        </th>
                        <th
                            class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            رقم الهاتف
                        </th>
                        <th
                            class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            التحكم
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="admin in admins"
                        :key="admin.id"
                        class="odd:bg-white even:bg-primary-opacity"
                    >
                        <td
                            class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/3 md:w-1/4 lg:w-1/6"
                        >
                            {{ admin.fullName }}
                        </td>
                        <td
                            class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ admin.phoneNumber }}
                        </td>
                        <td
                            class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/6 md:w-1/12 lg:w-1/12"
                        >
                            <a
                                class="text-blue-500 hover:text-blue-700 pl-2 sm:pl-4"
                                href="editAdmin"
                            >
                                <i class="fa fa-edit"></i>
                                <!-- Edit Icon -->
                            </a>
                            <a class="text-red-500 hover:text-red-700">
                                <i class="fa fa-trash"></i>
                                <!-- Delete Icon -->
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <a
        class="w-full md:w-auto h-full rounded-xl mt-5 flex justify-center items-center text-primary border-4 border-primary border-dotted bg-[#F5F5F5]"
        href="addAdmin"
    >
        <p class="block my-2 mx-2 md:mx-4 text-center md:text-left">
            اضافة مستخدم جديد الى لوحة التحكم
        </p>
    </a>
</template>

<script lang="ts">
type Admin = {
    id: number
    fullName: string
    phoneNumber: number
}

export default {
    props: {
        admins: {
            type: Array as () => Admin[],
            required: true,
        },
    },
    data() {
        return {
            admins: this.admins,
        }
    },
}
</script>
