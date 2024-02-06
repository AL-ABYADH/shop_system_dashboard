<style>
body {
    margin: 0%;
}
</style>

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
                    <div v-if="error" class="text-red-500">
                        {{ error }}
                    </div>
                    <div class="flex justify-center items-cente">
                        <button
                            type="submit"
                            class="flex justify-center items-center cursor-pointer md:mt-5 h-10 bg-theme-blue mx-0"
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
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            error: '',
        }
    },
    methods: {
        async submit() {
            if (this.form.username != '' && this.form.password != '') {
                await this.$inertia.post('/auth/login', this.form)
            } else if (this.form.username == '') {
                // username is required
            } else if (this.form.password == '') {
                // password is required
            }
        },
    },
}
</script>
