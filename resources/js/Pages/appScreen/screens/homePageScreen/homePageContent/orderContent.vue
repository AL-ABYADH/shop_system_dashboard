<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="bg-white w-full rounded-md p-4 mb-4 text-xs sm:text-lg">
        <div class="flex justify-between">
            <div>
                <table>
                    <tr class="flex justify-left items-center mb-2">
                        <td>
                            <div>
                                <img
                                    :src="imageUrl"
                                    @error="imageLoadError"
                                    class="w-12 h-auto rounded-full border-2 border-primary flex justify-center items-center ml-2 sm:w-20"
                                />
                            </div>
                        </td>
                        <td>
                            <span class="text- font-semibold sm:text-lg">{{
                                title
                            }}</span>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <div class="flex">
                                <tr>
                                    <i
                                        class="fa fa-map-marker fa-lg pr-1 text-primary ml-2"
                                    ></i>
                                </tr>
                                <tr>
                                    <p
                                        class="text-gray-600 text-md font-semibold pr-1"
                                    >
                                        {{ address }}
                                    </p>
                                </tr>
                            </div>
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

            <div>
                <table>
                    <tr>
                        <td>
                            <i
                                class="fa fa-calendar fa-lg text-primary ml-2"
                            ></i>
                        </td>
                        <td>
                            <p class="text-gray-600 font-semibold">
                                {{ dateItem(date) }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="fa fa-money fa-lg text-primary ml-2"></i>
                        </td>
                        <td>
                            <p class="text-gray-800 font-semibold">
                                {{ totalPrice }} ريال
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="fa fa-mobile fa-lg text-primary mr-2"></i>
                        </td>
                        <td>
                            <p class="text-gray-800 font-semibold">
                                {{ devicesNumber }} أجهزة
                            </p>
                        </td>
                    </tr>
                    <tr>
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
                        <td>
                            <i
                                class="fa fa-clock-o fa-lg text-primary ml-2"
                            ></i>
                        </td>
                        <td>
                            <p class="text-gray-800 font-semibold">
                                {{ timeItem(time) }}
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mt-4" v-if="expanded">
            <div v-for="(device, index) in devices" :key="index">
                <ul class="bg-primary-opacity mb-2 p-3 rounded-lg">
                    <li>
                        <strong> اسم الجهاز:</strong> {{ device.deviceName }}
                    </li>
                    <li><strong>البائع:</strong> {{ device.sellerName }}</li>
                    <li>
                        <strong>العنوان:</strong> {{ device.sellerAddress }}
                    </li>
                    <li>
                        <strong>رقم الهاتف:</strong>
                        {{ device.sellerPhoneNumber }}
                    </li>
                    <li>
                        <strong>السعر: </strong>
                        {{
                            device.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }}
                        USD
                    </li>
                    <li>
                        <strong>سعر الفحص:</strong>
                        {{
                            checkPrice(device.price)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }}
                        USD
                    </li>
                    <div v-for="flaw in device.flaws">
                        <li><strong>العيوب:</strong> {{ flaw.flaw }}</li>
                    </div>

                    <li><strong>الوصف:</strong> {{ device.description }}</li>
                    <li>
                        <strong>حالة الجهاز المستخدم:</strong>
                        {{ device.usedProductCondition }}
                    </li>
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
            <div>
                <table>
                    <tr>
                        <td>
                            <i class="fa fa-truck fa-lg text-primary ml-2"></i>
                        </td>
                        <td>
                            <p class="text-gray-600">
                                <strong> التوصيل: </strong
                                >{{ formattedDeliveryPrice }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="fa fa-dollar fa-lg text-primary mr-1"></i>
                        </td>
                        <td>
                            <p class="text-gray-600">
                                <strong> الإجمالي: </strong
                                >{{ totalPrice }} USD
                            </p>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="justify-center flex">
                <button
                    class="mt-4 text-white bg-primary p-2 ml-2 rounded-md hover:bg-primary-opacity2"
                >
                    قبول
                </button>
                <button
                    class="mt-4 text-white bg-red-600 p-2 rounded-md hover:bg-primary-opacity2"
                >
                    إلغاء
                </button>
            </div>
        </div>
        <div class="justify-center flex">
            <button
                class="mt-4 text-blue-500 underline"
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
import dateFormat from "dateformat";

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
    },
    data() {
        return {
            expanded: false,
        }
    },
    computed: {
        formattedDeliveryPrice() {
            if (typeof this.deliveryPrice === 'number') {
                return `${this.deliveryPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} USD`
            } else {
                return 'بدون توصيل'
            }
        },

    },
    methods: {
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
        dateItem(dateObj) {
          const dateObject = new Date(dateObj)
          const formattedDate = dateFormat(dateObject, 'd/m/yyyy')
return formattedDate
        },
        timeItem(timeObj) {
          const timeObject = new Date(timeObj)
          const formattedTime = dateFormat(timeObject, 'hh : mm')
return formattedTime
        },
    },
}
</script>

<style scoped>
/* Add Tailwind CSS classes here as needed */
</style>
