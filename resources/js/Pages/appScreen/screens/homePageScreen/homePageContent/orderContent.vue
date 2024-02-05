<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="bg-white w-full rounded-md p-4 mb-4 text-xs sm:text-lg transition-all duration-300 ease-in-out">
        <div class="flex justify-between">
            <div>
                <table>
                    <tr class="flex justify-left items-center">
                        <td>
                            <span class="text- font-semibold sm:text-lg">{{
                                title
                            }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p
                                class="text-gray-600 sm:text-xs position-sticky font-thin"
                            >
                                {{ dateItem(date) }}
                            </p>
                        </td>
                    </tr>
                </table>
            </div>

            <div>
                <table>
                    <tr class="flex">
                        <td>
                            <i class="fa fa-phone fa-lg text-primary ml-2"></i>
                        </td>
                        <td>
                            <p class="text-gray-800 font-semibold">
                                {{ phoneNumber }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <div class="flex">
                            <td>
                                <i
                                    class="fa fa-hourglass-half fa-lg text-primary ml-2"
                                ></i>
                            </td>
                            <td>
                                <p class="text-gray-600 text-md font-semibold">
                                    {{
                                        orderStatus == 'confirmed'
                                            ? 'تم التأكيد'
                                            : 'جاري الأنتظار'
                                    }}
                                </p>
                            </td>
                        </div>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mt-4 transition-all duration-300 ease-in-out" v-if="expanded">
            <div
                class="bg-primary-opacity mb-2 p-3 rounded-lg flex justify-between"
            >
                <!-- First div aligned to the start -->
                <div>
                    <i class="fa fa-user-circle fa-lg ml-2"></i>
                    <strong class="text- font-semibold md:text-lg">{{
                        sellerName
                    }}</strong>
                </div>
                <!-- Second div aligned to the center -->
                <div>
                    <i class="fa fa-phone fa-lg ml-2"></i>
                    <strong class="text- font-semibold md:text-lg">{{
                        sellerPhoneNumber
                    }}</strong>
                </div>
                <!-- Third div aligned to the end -->
                <div>
                    <i class="fa fa-location-arrow fa-lg ml-2"></i>
                    <strong class="text- font-semibold md:text-lg">{{
                        sellerAddress
                    }}</strong>
                </div>
            </div>

            <div v-for="(device, index) in devices" :key="index">
                <div class="mb-2 p-3">
                    <div></div>
                    <strong
                        class="ml-3 text-primary bg-primary-opacity mb-2 p-3 rounded-lg"
                        >{{ device.deviceName }}</strong
                    >
                    <button
                        class="mt-4 text-blue-500 underline transition-all duration-300 ease-in-out"
                        @click="toggleExpansion2(index)"
                    >
                        <i
                            :class="
                                device.expanded
                                    ? 'fa fa-chevron-up text-primary'
                                    : 'fa fa-chevron-down text-primary'
                            "
                        ></i>
                    </button>
                </div>
                <div v-if="device.expanded">
                    <ul class="bg-gray-100 mb-2 p-3 rounded-lg">
                        <div class="flex justify-between mb-2">
                            <li>
                                <i
                                    class="fa fa-money text-primary fa-lg ml-1"
                                ></i>
                                {{
                                    device.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }}
                                USD
                            </li>
                            <li>
                                <i
                                    class="fa fa-inbox text-primary fa-lg ml-2"
                                ></i>
                                2000 USD
                            </li>
                            <li>
                                <i
                                    class="fa fa-mobile text-primary fa-lg ml-1"
                                ></i>
                                {{ device.isUsed == 1?
                                    usedProductCondition(
                                        device.usedProductCondition
                                    ): "جديد"
                                }}
                            </li>
                        </div>

                        <div class="flex justify-between mb-2">
                            <ul>
                                <li class="bg-primary-opacity p-2 rounded-lg">
                                    <i
                                        class="fa fa-info-circle text-primary fa-lg ml-1"
                                    ></i>
                                    <details dir="ltr">
                                        <summary class="transition-all duration-300 ease-in-out">التفاصيل</summary>
                                        {{ device.description }}
                                    </details>
                                </li>
                                <!-- Additional list items here -->
                            </ul>
                        </div>

                        <div v-for="flaw in device.flaws" dir="rtl">
                            <li><strong>العيوب:</strong> {{ flaw.flaw }}</li>
                        </div>
                        <!-- <li>
                        <strong>رابط الصور:</strong>
                        <a
                            :href="device.pictureLink"
                            class="underline text-primary"
                            >{{ device.pictureLink }}</a
                        >
                    </li> -->
                    </ul>
                </div>
            </div>
            <div>
                <table>
                    <tr>
                        <td>
                            <i class="fa fa-truck fa-lg text-primary ml-2"></i>
                        </td>
                        <td>
                            <p class="text-gray-600">
                                {{ formattedDeliveryPrice }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i
                                class="fa fa-sitemap fa-lg text-primary ml-2"
                            ></i>
                        </td>
                        <td>
                            <p class="text-gray-600">
                                {{ devices?.length }} وحده
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="fa fa-dollar fa-lg text-primary mr-1"></i>
                        </td>
                        <td>
                            <p class="text-gray-600">{{ totalPrice }} USD</p>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="justify-center flex w-full">
                <button
                    class="mt-4 text-white bg-primary p-2 ml-2 rounded-md w-60 hover:bg-primary-opacity2"
                >
                    {{ orderStatus == 'confirming' ? 'تأكيد' : 'إنهاء الطلب' }}
                </button>
                <button
                    class="mt-4 text-white bg-red-600 p-2 rounded-md w-60 hover:bg-primary-opacity2"
                    @click="showCancellationDialog = true"
                >
                    إلغاء
                </button>
            </div>
            <div v-if="showCancellationDialog" class="cancel-popup">
                <div class="cancel-content">
                    <div class="flex">
                        <i
                            class="fa fa-question-circle fa-lg mt-1 ml-2"
                            aria-hidden="true"
                        ></i>
                        <p class="mb-2 text-start">
                            ما هو سبب إلغاء طلب {{ title }}؟
                        </p>
                    </div>

                    <!-- Radio buttons for multiple choices -->
                    <div class="radio-group">
                        <div class="text-start mb-2">
                            <label>
                                <input
                                    type="radio"
                                    value="العناصر غير متوفرة"
                                    v-model="cancellationReason"
                                />
                                العناصر غير متوفرة
                            </label>
                        </div>
                        <div class="text-start mb-2">
                            <label>
                                <input
                                    type="radio"
                                    value="العناصر لا تتتطابق مع المواصفات المقدمة من البائع"
                                    v-model="cancellationReason"
                                />
                                العناصر لا تتتطابق مع المواصفات المقدمة من
                                البائع
                            </label>
                        </div>
                        <div class="text-start mb-2">
                            <label>
                                <input
                                    type="radio"
                                    value="other"
                                    v-model="cancellationReason"
                                />
                                آخر
                            </label>
                        </div>
                    </div>

                    <!-- Text area for other reason (conditionally shown) -->
                    <textarea
                        v-if="cancellationReason === 'other'"
                        v-model="otherReason"
                        placeholder="سبب الإلغاء"
                    ></textarea>

                    <div class="w-full">
                        <button
                            class="mt-4 text-white bg-primary p-2 w-44 ml-2 rounded-md hover:bg-primary-opacity2"
                            @click="cancelOrder"
                        >
                            تأكيد
                        </button>
                        <button
                            class="mt-4 text-white bg-red-600 p-2 w-44 rounded-md hover:bg-primary-opacity2"
                            @click="closeDialog"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="justify-center flex">
            <button
                class="mt-4 text-blue-500 underline transition-all duration-300 ease-in-out"
                @click="toggleExpansion"
            >
                <i
                    :class="
                        expanded
                            ? 'fa fa-chevron-up text-primary'
                            : 'fa fa-chevron-down text-primary'
                    "
                ></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import dateFormat from 'dateformat'

export default {
    props: {
        title: String,
        address: String,
        date: String,
        imageUrl: String,
        devicesNumber: Number,
        phoneNumber: String,
        time: String,
        devices: Array<any>,
        deliveryPrice: Number,
        totalPrice: Number,
        orderStatus: String,
        sellerName: String,
        sellerAddress: String,
        sellerPhoneNumber: String,
    },
    data() {
        return {
            expanded: false,
            showCancellationDialog: false,
            cancellationReason: 'العناصر غير متوفرة',
            otherReason: '', // Text area value for other reason
        }
    },
    computed: {
        formattedDeliveryPrice() {
            if (typeof this.deliveryPrice === 'number') {
                return (
                    `USD ${this.deliveryPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}   /   ` +
                    this.address
                )
            } else {
                return 'بدون توصيل'
            }
        },
    },
    methods: {
        cancelOrder() {
            let reason = this.cancellationReason
            // If the reason is 'other', use the text area value
            if (reason === 'other') {
                reason = this.otherReason
            }
            // You can emit an event to the parent component to handle cancellation
            this.$emit('cancel', {
                orderId: this.orderId,
                reason: reason,
            })
            this.closeDialog()
        },
        closeDialog() {
            this.showCancellationDialog = false
        },
        checkPrice(devicePrice) {
            // Calculate the checkPrice as 20% of the device's price
            const checkPrice = 0.05 * devicePrice
            return checkPrice
        },
        toggleExpansion() {
            this.expanded = !this.expanded
        },
        imageLoadError() {
            console.log('Image failed to load')
        },
        usedProductCondition(condition) {
            switch (condition) {
                case 'excellent':
                    return 'ممتاز'
                case 'good':
                    return 'جيدة جدا'
                case 'normal':
                    return 'جيد'
                case 'bad':
                    return 'مقبول'
                case 'terrible':
                    return 'سيئ'
                default:
                    return 'جديد'
            }
        },
        toggleExpansion2(index) {
            this.devices[index].expanded = !this.devices[index].expanded
        },
        dateItem(dateObj) {
            const dateObject = new Date(dateObj)
            const formattedDate = dateFormat(dateObject, 'yyyy-mm-dd')
            const time = dateFormat(dateObject, 'HH:mm:ss ')
            return time + formattedDate
        },
    },
}
</script>

<style scoped>
.cancel-popup {
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

.cancel-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 400px; /* Adjust the width as needed */
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
