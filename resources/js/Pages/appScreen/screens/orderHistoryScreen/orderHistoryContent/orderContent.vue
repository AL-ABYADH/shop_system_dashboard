<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="bg-white w-full rounded-md p-4 mb-4 text-xs sm:text-lg">
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
                                    {{ 'منتهي' }}
                                </p>
                            </td>
                        </div>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mt-4" v-if="expanded">
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
                        class="mt-4 text-blue-500 underline"
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
                            <li class="flex">
                                <img
                                    src="../../../../../Assets/icons/mobile.svg"
                                    class="w-5 ml-2 lg:w-7"
                                />
                                {{ device.deviceName }}
                            </li>
                            <li>
                                <i
                                    class="fa fa-money text-primary fa-lg ml-1"
                                ></i>
                                {{ formatCurrency(device.price, currency) }}
                            </li>
                            <li>
                                <i
                                    class="fa fa-mobile text-primary fa-lg ml-1"
                                ></i>
                                {{
                                    device.isUsed == 1
                                        ? usedProductCondition(
                                              device.usedProductCondition
                                          )
                                        : 'جديد'
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
                                        <summary>التفاصيل</summary>
                                        {{ device.description }}
                                    </details>
                                </li>
                                <!-- Additional list items here -->
                            </ul>
                        </div>

                        <div
                            class="flex justify-between mb-5"
                            v-if="device.flaws.length != 0"
                        >
                            <ul>
                                <li class="bg-primary-opacity p-2 rounded-lg">
                                    <i
                                        class="fa fa-exclamation-triangle text-primary fa-lg ml-1"
                                    ></i>
                                    <details dir="ltr">
                                        <summary>العيوب</summary>
                                        <div
                                            v-for="flaw in device.flaws"
                                            dir="rtl"
                                        >
                                            <li>
                                                {{ flaw.flaw }} :
                                                <strong>{{
                                                    translateSeverity(
                                                        flaw.severity
                                                    )
                                                }}</strong>
                                            </li>
                                        </div>
                                    </details>
                                </li>
                                <!-- Additional list items here -->
                            </ul>
                        </div>
                        <div
                            class="flex mb-5"
                            v-if="device.imageItems.length != 0"
                        >
                            <ul>
                                <li class="bg-primary-opacity p-2 rounded-lg">
                                    <i
                                        class="fa fa-image text-primary fa-lg ml-1"
                                    ></i>
                                    <details dir="ltr">
                                        <summary class="">الصور</summary>
                                        <div class="h-2"></div>
                                        <div class="flex">
                                            <div
                                                v-for="(
                                                    image, index
                                                ) in device.imageItems"
                                                :key="index"
                                                dir="rtl"
                                                class="flex rounded-sm justify-between p-1"
                                            >
                                                <li class="md:w-32 sm: w-10">
                                                    <img
                                                        :src="image.imageUrl"
                                                        alt=""
                                                        class="rounded-md border-primary border-2 w-10 h-10 sm:w-10 sm:h-10 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-32 xl:h-32"
                                                        @click="
                                                            openImageDialog(
                                                                image.imageUrl
                                                            )
                                                        "
                                                    />
                                                </li>
                                            </div>
                                        </div>
                                    </details>
                                </li>
                                <!-- Additional list items here -->
                            </ul>
                        </div>
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
                            <img
                                src="../../../../../Assets/icons/commission.svg"
                                class="w-5 ml-2 lg:w-7"
                            />
                        </td>
                        <td>
                            <p class="text-gray-600">
                                {{ formatCurrency(commission, currency) }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img
                                src="../../../../../Assets/icons/devices.svg"
                                alt=""
                                class="w-5 ml-2 lg:w-7"
                            />
                        </td>
                        <td>
                            <p class="text-gray-600">
                                {{ devices?.length || 0 }}
                                {{
                                    devices?.length && devices.length > 10
                                        ? 'جهاز'
                                        : devices?.length && devices.length > 1
                                        ? 'أجهزة'
                                        : 'جهاز'
                                }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="fa fa-dollar fa-lg text-primary mr-1"></i>
                        </td>
                        <td>
                            <p class="text-gray-600">
                                {{ formatCurrency(totalPrice, currency) }}
                            </p>
                        </td>
                    </tr>
                </table>
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
        <transition name="popup">
            <div
                v-if="showImageDialog"
                class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
                @click="closeImageDialog"
            >
                <div
                    class="max-w-screen-sm bg-white rounded-lg overflow-hidden"
                >
                    <img
                        :src="modalImageUrl"
                        alt="Large Image"
                        class="w-full transform scale-110 transition-transform duration-500"
                    />
                    <button
                        @click="closeImageDialog"
                        class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-black focus:outline-none"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </transition>
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
        orderId: Number,
        currency: String,
        commission: Number,
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
            isModalActive: false,
            showImageDialog: false,
            modalImageUrl: '',
        }
    },
    computed: {
        formattedDeliveryPrice() {
            if (typeof this.deliveryPrice === 'number') {
                return (
                    this.formatCurrency(this.deliveryPrice, this.currency) +
                    ' / ' +
                    this.address
                )
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
        openModal(imageUrl: string) {
            this.isModalActive = true
            this.modalImageUrl = imageUrl
        },
        closeModal() {
            this.isModalActive = false
            this.modalImageUrl = ''
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
        formatCurrency(amount, currency) {
            switch (currency) {
                case 'YER':
                    return amount + ' ريال يمني'
                case 'SAR':
                    return amount + ' ريال سعودي'
                case 'USD':
                    return amount + ' دولار أمريكي'
                default:
                    return amount + ' ' + currency
            }
        },
        openImageDialog(imageUrl) {
            this.showImageDialog = true
            this.modalImageUrl = imageUrl
        },
        closeImageDialog() {
            this.showImageDialog = false
            this.modalImageUrl = ''
        },
        translateSeverity(severity) {
            switch (severity) {
                case 'verySlight':
                    return 'ضئيل جدًا'
                case 'slight':
                    return 'طفيف'
                case 'noticeable':
                    return 'ملحوظ'
                case 'sever':
                    return 'شديد'
                case 'verySever':
                    return 'شديد جدًا'
                default:
                    return 'غير مذكور'
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
.image-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.image-content {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 80vw;
    position: relative;
}

.image-content img {
    max-width: 80%;
    height: auto;
}

.modal-close {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #333;
    padding: 0;
}

.popup-enter-active {
    transform: scale(1.1); /* Set initial scale when opening */
}

.popup-enter-to {
    transform: scale(1); /* Set final scale when opening */
}

.popup-leave-active {
    transform: scale(1); /* Set initial scale when closing */
}

.popup-leave-to {
    transform: scale(0.9); /* Set final scale when closing */
}
</style>
