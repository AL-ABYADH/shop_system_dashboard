<template>
    <div class="max-w-md bg-white mx-auto mt-4 p-4 border rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-2">نموذج التسجيل</h2>
      <form @submit.prevent="submitForm">
        <!-- Picture Input -->
        <div v-if="!formData.picture" class="mb-3">
          <div class="cursor-pointer flex justify-center">
            <img src="../../../../.././../Assets/profile.jpg" alt="Select Profile Picture"
              class="w-24 h-auto rounded-full border-2 border-primary flex justify-center items-center"
              @click="$refs.pictureInput.click()" />
            <input ref="pictureInput" type="file" id="picture" class="hidden" accept="image/*" required
              @change="handlePictureChange" />
          </div>
          <div v-if="pictureTouched && !pictureIsValid" class="text-red-500 text-sm mt-1">الرجاء اختيار صورة صالحة.</div>
        </div>
  
        <!-- Display Selected Picture -->
        <div v-if="formData.picture" class="mb-2">
          <div class="flex justify-center">
            <img v-if="formData.picture" :src="pictureUrl" alt="Selected Profile Picture"
              class="w-24 h-auto rounded-full border-2 border-primary" />
          </div>
          <div class="flex justify-center">
            <button @click="clearPicture" type="button"
              class="text-red-500 hover:text-red-600 cursor-pointer text-center">
              حذف الصورة
            </button>
          </div>
        </div>
  
        <!-- Name Input -->
        <div class="mb-2">
          <input type="text" id="name" v-model="formData.name"
            class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
            placeholder="أدخل اسمك (باللغة العربية أو الإنجليزية)" required @blur="validateName" />
          <div v-if="nameTouched && !nameIsValid" class="text-red-500 text-sm mt-1">الرجاء إدخال اسم صالح باللغة
            العربية أو الإنجليزية.</div>
        </div>
  
        <!-- Phone Number Input -->
        <div class="mb-2">
          <input type="tel" id="phone" v-model="formData.phone"
            class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
            placeholder="أدخل رقم هاتفك (9 أرقام)" pattern="[0-9]{9}" required @blur="validatePhone" />
          <div v-if="phoneTouched && !phoneIsValid" class="text-red-500 text-sm mt-1">الرجاء إدخال رقم هاتف مكون من 9
            أرقام.</div>
        </div>
  
        <!-- Email Input -->
        <div class="mb-2">
          <input type="email" id="email" v-model="formData.email"
            class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
            placeholder="أدخل بريدك الإلكتروني (مثال: example@example.com)" required @blur="validateEmail" />
          <div v-if="emailTouched && !emailIsValid" class="text-red-500 text-sm mt-1">الرجاء إدخال عنوان بريد إلكتروني
            صالح.</div>
        </div>
  
        <!-- Password Input -->
        <div class="mb-2">
          <input type="password" id="password" v-model="formData.password"
            class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
            placeholder="أدخل كلمة المرور" required @blur="validatePassword" />
          <div v-if="passwordTouched && !passwordIsValid" class="text-red-500 text-sm mt-1">كلمة المرور يجب أن تحتوي
            على 6 أحرف على الأقل.</div>
        </div>
  
        <!-- Confirm Password Input -->
        <div class="mb-2">
          <input type="password" id="confirmPassword" v-model="formData.confirmPassword"
            class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
            placeholder="أعد إدخال كلمة المرور" required @blur="validateConfirmPassword" />
          <div v-if="confirmPasswordTouched && !confirmPasswordIsValid" class="text-red-500 text-sm mt-1">كلمة المرور
            غير متطابقة.</div>
        </div>
  
        <!-- Submit Button -->
        <button :disabled="!isFormValid" type="submit"
          class="w-full mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-opacity2 focus:bg-primary-opacity">إرسال</button>
      </form>
    </div>
  </template>
  
  
  
<script lang="ts">
export default {
    data() {
        return {
            formData: {
                picture: null, // Store the picture file
                name: "",
                phone: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            nameRegex: /^[a-zA-Z\u0600-\u06FF\s]+$/,
            phoneRegex: /^\d{9}$/,
            emailRegex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            passwordRegex: /^.{6,}$/,
            nameTouched: false,
            phoneTouched: false,
            emailTouched: false,
            passwordTouched: false,
            confirmPasswordTouched: false,
            pictureTouched: false,
        };
    },
    computed: {
        isFormValid() {
            return (
                this.pictureIsValid &&
                this.nameIsValid &&
                this.phoneIsValid &&
                this.emailIsValid &&
                this.passwordIsValid &&
                this.confirmPasswordIsValid
            );
        },
        nameIsValid() {
            return this.nameRegex.test(this.formData.name);
        },
        phoneIsValid() {
            return this.phoneRegex.test(this.formData.phone);
        },
        emailIsValid() {
            return this.emailRegex.test(this.formData.email);
        },
        passwordIsValid() {
            return this.passwordRegex.test(this.formData.password);
        },
        confirmPasswordIsValid() {
            return this.formData.password === this.formData.confirmPassword;
        },
        pictureIsValid() {
            return !!this.formData.picture;
        },
        pictureUrl() {
            // Generate a data URL for the selected picture
            if (this.formData.picture) {
                return URL.createObjectURL(this.formData.picture);
            }
            return null;
        },
    },
    methods: {
        submitForm() {
            // Handle form submission
            // You can access form data in this.formData
            // Send the data to your server or perform other actions
        },
        handlePictureChange(event) {
            this.formData.picture = event.target.files[0];
            this.pictureTouched = true;
        },
        clearPicture() {
            this.formData.picture = null;
            this.pictureTouched = false;
        },
        validateName() {
            this.nameTouched = true;
        },
        validatePhone() {
            this.phoneTouched = true;
        },
        validateEmail() {
            this.emailTouched = true;
        },
        validatePassword() {
            this.passwordTouched = true;
        },
        validateConfirmPassword() {
            this.confirmPasswordTouched = true;
        },
    },
};
</script>
  
<style>
/* Add any custom styles here */
</style>