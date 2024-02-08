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
                            مفتوح
                        </th>
                        <th
                            class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            مغلق
                        </th>
                        <th
                            class="px-4 py-2 sm:py-3 md:py-3 lg:py-3 xl:py-3 text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-500"
                        >
                            أيام الإغلاق
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
                        v-for="seller in sellers"
                        :key="seller.id"
                        class="odd:bg-white even:bg-primary-opacity"
                    >
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/3 md:w-1/4 lg:w-1/6"
                        >
                            {{ seller.fullName }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ seller.phoneNumber }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ seller.address }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ seller.shopOpen }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ seller.shopClose }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ getArabicCloseDays(seller.closeDays) }}
                        </td>
                        <td
                            class="px-2 text-red-600 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ seller.warnings }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/6 md:w-1/12 lg:w-1/12"
                        >
                            <div class="tooltip-container">
                                <button
                                    class="text-red-500 hover:text-red-700 mr-5 sm:ml-4 sm:mr-10"
                                    @click="showWarningPopupForSeller(seller)"
                                >
                                    <i class="fa fa-warning"></i>
                                    <!-- Edit Icon -->
                                </button>
                                <div class="tooltip">إنذار</div>
                            </div>
                            <div class="tooltip-container">
                                <button
                                    class="text-red-500 hover:text-red-700 ml-3 p-2 sm:ml-4"
                                    @click="showWarningPopupForSeller(seller)"
                                >
                                    <i class="fa fa-ban"></i>
                                    <!-- Edit Icon -->
                                </button>
                                <div class="tooltip">حظر</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="showWarningPopup" class="warning-popup">
        <div class="warning-content">
            <h3 class="font-semibold mb-3">
                إعطاء إنذار ل{{ selectedSeller?.fullName }}
            </h3>
            <textarea
                v-model="warningReason"
                placeholder="سبب الإنذار"
            ></textarea>
            <div class="button-container">
                <button
                    @click="sendWarning"
                    class="mt-4 text-white bg-primary p-2 ml-2 rounded-md hover:bg-primary-opacity2"
                >
                    إرسال الإنذار
                </button>
                <button
                    @click="cancelWarning"
                    class="mt-4 text-white bg-red-600 p-2 rounded-md hover:bg-primary-opacity2"
                >
                    إلغاء
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import VTooltip from 'v-tooltip'
type Seller = {
    id: number
    fullName: string
    phoneNumber: string
    address: string
    warnings: number
    shopOpen: string | null
    shopClose: string | null
    closeDays: string | null
}

export default {
    props: {
        sellers: {
            type: Array as () => Seller[],
            required: true,
        },
    },

    directives: {
        tooltip: VTooltip.VTooltip,
        'close-popover': VTooltip.VClosePopover,
    },
    data() {
        return {
            showWarningPopup: false,
            warningReason: '',
            selectedSeller: null as Seller | null,
        }
    },
    methods: {
        getArabicCloseDays(closeDaysString) {
            if (!closeDaysString) return ''

            // Regular expression to match punctuation marks
            const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g

            // Regular expression to match English days
            const dayRegex =
                /sunday|monday|tuesday|wednesday|thursday|friday|saturday/gi

            // Array of Arabic days
            const arabicDays = [
                'الأحد',
                'الاثنين',
                'الثلاثاء',
                'الأربعاء',
                'الخميس',
                'الجمعة',
                'السبت',
            ]

            // Replace punctuation marks with an empty string
            let result = closeDaysString.replace(punctuationRegex, '')

            // Replace English days with Arabic and join with comma and space
            result = result.replace(
                dayRegex,
                (match) =>
                    arabicDays[
                        dayRegex.source.split('|').indexOf(match.toLowerCase())
                    ] + ', '
            )

            // Remove the last comma and space and trim leading and trailing whitespace
            result = result.slice(0, -2).trim()

            return result
        },
        showWarningPopupForSeller(seller) {
            // Set the current seller being warned
            if (seller) {
                this.selectedSeller = seller
                this.showWarningPopup = true
            }
        },
        sendWarning() {
            // Send the warning reason to the database and update the seller's data
            // For example, you can use an API call here.
            // const warningData = {
            //     sellerId: this.selectedSeller.id,
            //     reason: this.warningReason,
            // }

            // After successful update, close the popup and reset the reason field
            // This is just a placeholder, you should implement the actual API call.
            // axios.post("/api/sendWarning", warningData).then(() => {
            this.showWarningPopup = false
            this.warningReason = ''
            // });
        },
        cancelWarning() {
            // Close the warning popup and reset the reason field
            this.showWarningPopup = false
            this.warningReason = ''
        },
    },
}
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
.warning-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* Ensure it's on top */
}

.warning-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 400px; /* Adjust the width as needed */
}

.button-container {
    margin-top: 20px;
}

textarea {
    width: 100%;
    height: 100px; /* Adjust the height as needed */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    resize: vertical; /* Allow vertical resizing */
    box-shadow: none;
}
</style>
