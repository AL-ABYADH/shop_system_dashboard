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
              اسم البائع
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
            <th
              class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
            >
              الإنذارات
            </th>
            <th
              class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
            >
              التحكم
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(person, index) in people"
            :key="index"
            class="odd:bg-white even:bg-primary-opacity"
          >
            <td
              class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/3 md:w-1/4 lg:w-1/6"
            >
              {{ person.name }}
            </td>
            <td
              class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {{ person.phone }}
            </td>
            <td
              class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {{ person.address }}
            </td>
            <td
              class="px-2 text-red-600 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {{ person.warnings }}
            </td>
            <td
              class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/6 md:w-1/12 lg:w-1/12"
            >
              <div class="tooltip-container">
                <button class="text-red-500 hover:text-red-700 pl-2 sm:pl-4">
                  <i class="fa fa-warning"></i>
                  <!-- Edit Icon -->
                </button>
                <div class="tooltip">إنذار</div>
              </div>

              <div class="tooltip-container">
                <button class="text-red-500 hover:text-red-700">
                <i class="fa fa-trash"></i>
                <!-- Delete Icon -->
              </button>
              <div class="tooltip">
      حذف
    </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import VTooltip from "v-tooltip";

export default {
  directives: {
    tooltip: VTooltip.VTooltip,
    "close-popover": VTooltip.VClosePopover,
  },
  data() {
    return {
      people: [
        {
          id: 1,
          name: "حمود حامد",
          email: "john@example.com",
          phone: 770893740,
          address: "صنعاء - شعوب",
          warnings: 1,
        },
        {
          id: 2,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مديرية",
          warnings: 2,
        },
        {
          id: 3,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 4,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مدينة",
          warnings: 3,
        },
        {
          id: 5,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مدينة",
          warnings: 1,
        },
        {
          id: 6,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 7,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مدينة",
          warnings: 2,
        },
        {
          id: 8,
          name: "حمادي حامد",
          email: "jane@example.com",
          phone: 774546494,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 9,
          name: "محمد أحمد",
          email: "mohamed@example.com",
          phone: 777777777,
          address: "صنعاء - مدينة",
          warnings: 4,
        },
        {
          id: 10,
          name: "أحمد محمد",
          email: "ahmed@example.com",
          phone: 778888888,
          address: "صنعاء - مدينة",
          warnings: 1,
        },
        {
          id: 11,
          name: "علي أحمد",
          email: "ali@example.com",
          phone: 779999999,
          address: "صنعاء - شعوب",
          warnings: 2,
        },
        {
          id: 12,
          name: "فاطمة محمد",
          email: "fatima@example.com",
          phone: 770000000,
          address: "صنعاء - مديرية",
          warnings: 1,
        },
        {
          id: 13,
          name: "خالد حسن",
          email: "khaled@example.com",
          phone: 771111111,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 14,
          name: "نور عبدالله",
          email: "nour@example.com",
          phone: 772222222,
          address: "صنعاء - مدينة",
          warnings: 3,
        },
        {
          id: 15,
          name: "لمى ياسر",
          email: "lamya@example.com",
          phone: 773333333,
          address: "صنعاء - مدينة",
          warnings: 1,
        },
        {
          id: 16,
          name: "عبدالرحمن محمود",
          email: "abdulrahman@example.com",
          phone: 774444444,
          address: "صنعاء - مدينة",
          warnings: 2,
        },
        {
          id: 17,
          name: "فهد علي",
          email: "fahad@example.com",
          phone: 775555555,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 18,
          name: "إيمان سليمان",
          email: "eman@example.com",
          phone: 776666666,
          address: "صنعاء - مدينة",
          warnings: 4,
        },
        {
          id: 19,
          name: "سلمى عبدالله",
          email: "salma@example.com",
          phone: 777777777,
          address: "صنعاء - مدينة",
          warnings: 1,
        },
        {
          id: 20,
          name: "أحمد محمد",
          email: "ahmed@example.com",
          phone: 778888888,
          address: "صنعاء - مدينة",
          warnings: 3,
        },
        {
          id: 21,
          name: "نادية يوسف",
          email: "nadiah@example.com",
          phone: 779999999,
          address: "صنعاء - شعوب",
          warnings: 2,
        },
        {
          id: 22,
          name: "يوسف عبدالله",
          email: "yousef@example.com",
          phone: 770000000,
          address: "صنعاء - مديرية",
          warnings: 0,
        },
        {
          id: 23,
          name: "سارة حسن",
          email: "sara@example.com",
          phone: 771111111,
          address: "صنعاء - مدينة",
          warnings: 1,
        },
        {
          id: 24,
          name: "محمد نور",
          email: "mohamed@example.com",
          phone: 772222222,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 25,
          name: "علي عبدالرحمن",
          email: "ali@example.com",
          phone: 773333333,
          address: "صنعاء - مدينة",
          warnings: 1,
        },
        {
          id: 26,
          name: "سلمان لمى",
          email: "salman@example.com",
          phone: 774444444,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 27,
          name: "رحمة فهد",
          email: "rahma@example.com",
          phone: 775555555,
          address: "صنعاء - مدينة",
          warnings: 2,
        },
        {
          id: 28,
          name: "ياسر إيمان",
          email: "yaser@example.com",
          phone: 776666666,
          address: "صنعاء - مدينة",
          warnings: 4,
        },
        {
          id: 29,
          name: "فاطمة سلمى",
          email: "fatima@example.com",
          phone: 777777777,
          address: "صنعاء - مدينة",
          warnings: 0,
        },
        {
          id: 30,
          name: "محمود يوسف",
          email: "mahmoud@example.com",
          phone: 778888888,
          address: "صنعاء - مدينة",
          warnings: 3,
        },
      ],
    };
  },
};
</script>
<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 3;
}
</style>
