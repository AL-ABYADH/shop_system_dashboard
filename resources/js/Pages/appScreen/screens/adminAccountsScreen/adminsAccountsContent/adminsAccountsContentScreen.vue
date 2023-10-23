<style>
.bt {
    text-align: center;
    vertical-align: middle;
}
</style>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div id="app" class="md:pt-1 bg-white rounded-md">
    <div class="overflow-y-auto h-96 md:h-96">
        <table class="w-full divide-primary divide-y-2">
            <thead>
                <tr>
                    <th
                        class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500">
                        اسم المشرف</th>
                    <th
                        class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500">
                        رقم الهاتف</th>
                    <th
                        class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500">
                         العنوان</th>
                    <th
                        class="px-4 py-2 sm:px-6 sm:py-3 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500">
                        التحكم</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(person, index) in people" :key="index" class='odd:bg-white even:bg-primary-opacity'>
                    <td
                        class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/3 md:w-1/4 lg:w-1/6">
                        {{ person.name }}</td>
                    <td
                        class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4">
                        {{ person.phone }}</td>
                    <td
                        class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4">
                        {{ person.address }}</td>
                    <td
                        class="px-2 py-2 sm:px-4 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/6 md:w-1/12 lg:w-1/12">
                        <button class="text-blue-500 hover:text-blue-700 pl-2 sm:pl-4">
                            <i class="fa fa-edit"></i> <!-- Edit Icon -->
                        </button>
                        <button class="text-red-500 hover:text-red-700">
                            <i class="fa fa-trash"></i> <!-- Delete Icon -->
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>



    <a class="w-full md:w-auto h-full rounded-xl mt-5 flex justify-center items-center text-primary border-4 border-primary border-dotted bg-[#F5F5F5]"
        href="www.google.com">
        <p class="block my-2 mx-2 md:mx-4 text-center md:text-left">اضافة مستخدم جديد الى لوحة التحكم</p>
    </a>
</template>

<script lang="ts">
export default {
    data() {
        return {
            people: [
      {
        id: 1, // Unique ID
        name: 'حمود حامد',
        phone: 770893740,
        address: 'صنعاء - شعوب', // Add address field
      },
      {
        id: 2, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مديرية', // Add address field
      },
      {
        id: 3, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 4, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 5, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 6, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 7, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
      {
        id: 8, // Unique ID
        name: 'حمادي حامد',
        phone: 774546494,
        address: 'صنعاء - مدينة', // Add address field
      },
            ]
        }
    },
}
</script>