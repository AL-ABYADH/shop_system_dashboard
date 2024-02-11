import axios from 'axios';
<template>
    <div class="shadow-black/30 flex w-full fixed">
        <!-- Left Side (Form) -->
        <div class="w-full md:w-full bg-white h-screen items-center flex">
            <div class="w-full p-4 md:p-10">
                <h1
                    class="flex justify-center items-center text-lg md:text-xl lg:text-2xl mb-4 md:mb-6"
                >
                    اهلا بك في لوحة التحكم
                </h1>
                <form @submit.prevent="submit">
                    <div class="py-2">
                        <div class="flex justify-center items-center">
                            <input
                                v-model="form.username"
                                type="text"
                                onblur="this.type='text'"
                                placeholder="اسم المستخدم"
                                class="w-2/5 rounded-md bg-primary-opacity border-0 px-3 py-2 text-xs md:text-xs lg:text-base"
                            />
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="flex justify-center items-center">
                            <input
                                v-model="form.password"
                                type="password"
                                onblur="this.type='password'"
                                placeholder="كلمة المرور"
                                class="w-2/5 rounded-md bg-primary-opacity border-0 px-3 py-2 text-xs md:text-xs lg:text-base"
                            />
                        </div>
                    </div>
                    <div class="flex justify-center items-cente">
                        <button
                            :disabled="loading"
                            type="submit"
                            class="flex justify-center items-center cursor-pointer md:mt-5 h-10 bg-theme-blue mx-0"
                        >
                            <span
                                class="text-white bg-primary text-xs md:text-sm lg:text-base p-3 rounded-md"
                            >
                                {{
                                    loading
                                        ? 'جاري المعالجة...'
                                        : 'تسجيل الدخول '
                                }}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div v-if="snackbarVisible" class="snackbar" :class="'error'">
            <span>{{ errorMessage }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios' // Import Axios for HTTP requests

export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            errorMessage: '',
            loading: false,
            snackbarVisible: false,
        }
    },
    methods: {
        async submit() {
            try {
                this.loading = true
                const response = await axios.post('/auth/login', this.form)
                // Handle successful response if needed
                console.log(response) // Log the response data
                this.snackbarVisible = false
                this.$inertia.visit('/', { replace: true });
            } catch (error) {
                console.error('An error occurred:', error) // Log the error for debugging
                if (error.response && error.response.status === 400) {
                    // Unauthorized error
                    this.errorMessage = 'اسم المستخدم أو كلمة المرور غير صحيحة'
                } else {
                    // Other errors
                    this.errorMessage = 'حدث خطأ غير متوقع'
                }
                this.snackbarVisible = true
            } finally {
                this.loading = false
                setTimeout(() => {
                    this.snackbarVisible = false
                }, 2000)
            }
        },
    },
}
</script>

<style scoped>
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
