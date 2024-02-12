<template>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div
        class="bg-white w-full rounded-md p-4 mb-4 text-xs sm:text-lg transition-transform duration-300"
    >
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
                                        returnRequestStatus == 'evaluating'
                                            ? 'قيد التحقق'
                                            : 'جاري الأنتظار'
                                    }}
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
                <div class="mb-2 p-3 transition-transform duration-300">
                    <div></div>
                    <strong
                        class="ml-3 text-primary bg-primary-opacity mb-2 p-3 rounded-lg transition-transform duration-300"
                        >{{ device.deviceName }}</strong
                    >
                    <button
                        class="mt-4 text-blue-500 underline transition-transform duration-300"
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

                        <div class="flex justify-between mt-3 mb-5">
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
                                                        class="rounded-md border-primary border-2"
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
                        <div class="flex justify-between mb-5">
                            <ul>
                                <li class="bg-primary-opacity p-2 rounded-lg">
                                    <img src="../../../../../Assets/icons/return.svg" class="w-5 ml-2 lg:w-7">
                                    <details dir="ltr">
                                        <summary>سبب الإرجاع</summary>
                                        {{ device.reason }}
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
            <div
                class="justify-center flex w-full"
                v-if="returnRequestStatus == 'evaluating'"
            >
                <button
                    class="mt-4 text-white bg-primary p-2 ml-2 rounded-md w-60 hover:bg-primary-opacity2"
                    @click="showReturningDialog = true"
                >
                    قبول
                </button>
                <button
                    :disabled="loading || successMessage.length != 0"
                    class="mt-4 text-white bg-red-600 p-2 rounded-md w-60 hover:bg-primary-opacity2"
                    @click="resolveDismissedReturnRequest(returnRequestId)"
                >
                    {{ loading ? 'جاري المعالجة...' : 'رفض ' }}
                </button>
            </div>
            <div
                :disabled="loading || successMessage.length != 0"
                class="justify-center flex w-full"
                v-if="returnRequestStatus == 'awaiting'"
                @click="handleReturnRequest(returnRequestId)"
            >
                <button
                    class="mt-4 text-white bg-primary p-2 ml-2 rounded-md w-60 hover:bg-primary-opacity2"
                >
                    {{ loading ? 'جاري المعالجة...' : ' التحقق من الطلب' }}
                </button>
            </div>
            <div v-if="showReturningDialog" class="return-popup">
                <div class="return-content">
                    <div class="flex">
                        <i
                            class="fa fa-question-circle fa-lg mt-1 ml-2"
                            aria-hidden="true"
                        ></i>
                        <p class="mb-2 text-start">العناصر المرجعة:</p>
                    </div>

                    <ul>
                        <li
                            v-for="(device, index) in devices"
                            :key="index"
                            class="text-end"
                        >
                            <input
                                type="checkbox"
                                v-model="selectedReturnedProducts[index]"
                            />
                            <strong class="w-20 mr-3">{{
                                device.deviceName
                            }}</strong>
                        </li>
                    </ul>
                    <div class="w-full">
                        <button
                            :disabled="
                                loadingReturning ||
                                successMessage.length != 0 ||
                                selectedReturnedProducts.length == 0
                            "
                            class="mt-4 text-white bg-primary p-2 w-44 ml-2 rounded-md hover:bg-primary-opacity2"
                            @click="
                                resolveAcceptedReturnRequest(returnRequestId)
                            "
                        >
                            {{
                                loadingReturning ? 'جاري المعالجة...' : ' تأكيد'
                            }}
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
                class="mt-4 text-blue-500 underline transition-transform duration-300"
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
        <div v-if="snackbarVisible" class="snackbar" :class="snackbarType">
            <span>{{ successMessage || errorMessage }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import dateFormat from 'dateformat'
import axios from 'axios' // Import Axios for HTTP requests

export default {
    props: {
        returnRequestId: Number,
        title: String,
        address: String,
        date: String,
        imageUrl: String,
        devicesNumber: Number,
        phoneNumber: String,
        time: String,
        devices: Array<any>,
        currency: String,
        commission: Number,
        deliveryPrice: Number,
        totalPrice: Number,
        returnRequestStatus: String,
        sellerName: String,
        sellerAddress: String,
        sellerPhoneNumber: String,
    },
    data() {
        return {
            expanded: false,
            showReturningDialog: false,
            isModalActive: false,
            showImageDialog: false,
            modalImageUrl: '',
            loading: false,
            loadingReturning: false,
            successMessage: '',
            errorMessage: '',
            snackbarVisible: false,
            selectedReturnedProducts: [],
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
        snackbarType() {
            return this.successMessage ? 'success' : 'error'
        },
    },
    methods: {
        closeDialog() {
            this.showReturningDialog = false
        },
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
        async handleReturnRequest(returnRequestId) {
            this.loading = true
            try {
                const response = await axios.put(
                    `/returns/handle-return-request/${returnRequestId}`
                )
                console.log(response.data)

                this.loading = false
                this.successMessage = 'تم القبول بنجاح'
                this.snackbarVisible = true
                location.reload()
            } catch (error) {
                console.error(
                    'Error occurred while updating order status:',
                    error
                )
                this.errorMessage = 'فشل قبول الطلب'
                this.snackbarVisible = true
                this.loading = false
                // Handle error
            } finally {
                setTimeout(() => {
                    this.snackbarVisible = false
                }, 2000)

                // Set loading to false when the request completes (either success or failure)
            }
        },
        async resolveAcceptedReturnRequest(returnRequestId) {
            this.loadingReturning = true
            try {
                const returnedItemIds = this.devices
                    .filter((_, index) => this.selectedReturnedProducts[index])
                    .map((device) => device.id)

                const params = new URLSearchParams()
                returnedItemIds.forEach((id) =>
                    params.append('returnedItemIds[]', id)
                )

                const response = await axios.put(
                    `/returns/resolve-return-request/${returnRequestId}?${params.toString()}`
                )
                console.log(response.status)
                this.loadingReturning = false
                this.successMessage = 'تم الإرجاع '
                this.snackbarVisible = true
                location.reload()
            } catch (error) {
                console.error(
                    'Error occurred while updating order status:',
                    error
                )
                this.errorMessage = 'فشل الإرجاع'
                this.snackbarVisible = true
                this.loadingReturning = false
                // Handle error
            } finally {
                setTimeout(() => {
                    this.snackbarVisible = false
                }, 2000)
            }
        },
        async resolveDismissedReturnRequest(returnRequestId) {
            this.loading = true
            try {
                const response = await axios.put(
                    `/returns/resolve-return-request/${returnRequestId}`
                )
                console.log(response.data)

                this.loading = false
                this.successMessage = 'تم الرفض بنجاح'
                this.snackbarVisible = true
                location.reload()
            } catch (error) {
                console.error(
                    'Error occurred while updating order status:',
                    error
                )
                this.errorMessage = 'فشل رفض الطلب'
                this.snackbarVisible = true
                this.loading = false
                // Handle error
            } finally {
                setTimeout(() => {
                    this.snackbarVisible = false
                }, 2000)

                // Set loading to false when the request completes (either success or failure)
            }
        },
    },
}
</script>

<style scoped>
.return-popup {
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

.return-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 400px; /* Adjust the width as needed */
}
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
.snackbar {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.snackbar.success {
    background-color: #4caf50;
}

.snackbar.error {
    background-color: #f44336;
}
</style>
