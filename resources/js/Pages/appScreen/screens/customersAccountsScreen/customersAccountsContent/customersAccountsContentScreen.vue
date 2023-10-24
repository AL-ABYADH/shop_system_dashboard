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
                        v-for="customer in customers"
                        :key="customer.id"
                        class="odd:bg-white even:bg-primary-opacity"
                    >
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/3 md:w-1/4 lg:w-1/6"
                        >
                            {{ customer.name }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ customer.phone }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ customer.address }}
                        </td>
                        <td
                            class="px-2 text-red-600 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            {{ customer.warnings }}
                        </td>
                        <td
                            class="px-2 py-2 sm:py-2 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 whitespace-nowrap text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center sm:w-1/6 md:w-1/12 lg:w-1/12"
                        >
                            <div class="tooltip-container">
                                <button
                                    @click="showWarningPopupForCustomer(customer)"
                                    class="text-red-500 hover:text-red-700 pl-2 sm:pl-4"
                                >
                                    <i class="fa fa-warning"></i>
                                    <!-- Edit Icon -->
                                </button>
                                <div class="tooltip">إنذار</div>
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
                إعطاء إنذار ل{{ selectedCustomer.name }}
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
type Customer = {
    id: number
    name: string
    phone: number
    address: string
    warnings: number
}

export default {
    props: {
        customers: {
            type: Array as () => Customer[],
            required: true,
        },
    },

    directives: {
        tooltip: VTooltip.VTooltip,
        'close-popover': VTooltip.VClosePopover,
    },
    data() {
        return {
            customers: this.customers,
            showWarningPopup: false,
            warningReason: '',
        }
    },
    methods: {
        showWarningPopupForCustomer(customer) {
            // Set the current customer being warned
            this.selectedCustomer = customer
            this.showWarningPopup = true
        },
        sendWarning() {
            // Send the warning reason to the database and update the customer's data
            // For example, you can use an API call here.
            const warningData = {
                customerId: this.selectedCustomer.id,
                reason: this.warningReason,
            }

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
