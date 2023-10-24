<style>
body {
    margin: 0%;
}
</style>

<template>
    <div class="shadow-black/30 flex w-full fixed">
        <!-- Left Side (Form) -->
        <div class="w-full md:w-2/5 bg-white h-screen items-center flex">
            <div class="w-full p-4 md:p-10">
                <h1 class="text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                    اهلا بك في لوحة التحكم
                </h1>
                <h1 class="text-gray-500 text-xs md:text-sm lg:text-xs mb-4">
                    من خلال لوحة التحكم تستطيع التحكم بالنظام
                </h1>
                <form @submit.prevent="submit">
                    <div class="py-2">
                        <div class="relative">
                            <input
                                v-model="form.username"
                                type="text"
                                onblur="this.type='text'"
                                placeholder="اسم المستخدم"
                                class="w-full rounded-md bg-primary-opacity border-0 px-3 py-2 text-xs md:text-sm lg:text-base"
                            />
                            <div class="absolute left-0 top-0 h-full py-1 px-3">
                                <img
                                    src="../../../Assets/username.svg"
                                    class="h-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="py-2">
                        <div class="relative">
                            <input
                                v-model="form.password"
                                type="password"
                                onblur="this.type='password'"
                                placeholder="كلمة المرور"
                                class="w-full rounded-md bg-primary-opacity border-0 px-3 py-2 text-xs md:text-sm lg:text-base"
                            />
                            <div class="absolute left-0 top-0 h-full py-1 px-3">
                                <img
                                    src="../../../Assets/password.svg"
                                    class="h-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div v-if="errors">
                        <p>{{ errors }}</p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="rounded-md p-1 flex justify-center items-center px-4 cursor-pointer mt-4 md:mt-5 h-10 bg-theme-blue mx-0 w-full"
                        >
                            <span
                                class="text-white bg-primary text-xs md:text-sm lg:text-base p-3 rounded-md"
                                >تسجيل الدخول</span
                            >
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Right Side (Image) -->
        <div class="w-full md:w-3/5 lg:w-3/6 h-screen items-center flex">
            <div
                class="w-full h-full bg-gray-100 flex justify-center items-center flex-col"
            >
                <img
                    src="../../../Assets/favpng.png"
                    alt="login"
                    class="mb-16"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { usePage } from '@inertiajs/inertia-vue3'

export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        async submit() {
            console.log(this.form)
            await this.$inertia.post('/login/postForm', this.form)
        },
    },
    setup() {
        const { props } = usePage()

        return {
            errors: props.flash != undefined ? props.flash.errors : null,
        }
    },
}
</script>
