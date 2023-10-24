<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <div class="max-w-md bg-white mx-auto mt-4 p-4 border rounded-lg shadow-lg">
    <h2 class="text-lg font-semibold mb-2"></h2>
    <form @submit.prevent="submitForm" >
      <!-- Picture Input -->
      <div v-if="!formData.picture" class="mb-3">
        <div class="cursor-pointer flex justify-center">
          <img
            src="../../../../.././../Assets/profile.jpg"
            alt="Select Profile Picture"
            class="w-24 h-auto rounded-full border-2 border-primary flex justify-center items-center"
            @click="$refs.pictureInput.click()"
          />
          <input
            ref="pictureInput"
            type="file"
            id="picture"
            class="hidden"
            accept="image/*"
            @change="handlePictureChange"
          />
        </div>
        <div
          v-if="pictureTouched && !pictureIsValid"
          class="text-red-500 text-sm mt-1"
        >
          الرجاء اختيار صورة صالحة.
        </div>
      </div>

      <!-- Display Selected Picture -->
      <div v-if="formData.picture" class="mb-2">
        <div class="flex justify-center">
          <img
            v-if="formData.picture"
            :src="pictureUrl"
            alt="Selected Profile Picture"
            class="w-24 h-auto rounded-full border-2 border-primary"
          />
        </div>
        <div class="flex justify-center">
          <button
            @click="clearPicture"
            type="button"
            class="text-red-500 hover:text-red-600 cursor-pointer text-center"
          >
            حذف الصورة
          </button>
        </div>
      </div>

      <!-- Name Input -->
      <div class="mb-2">
        <input
          type="text"
          id="name"
          v-model="formData.name"
          class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
          placeholder="أدخل اسمك (باللغة العربية أو الإنجليزية)"
          required
          @blur="validateName"
        />
        <div
          v-if="nameTouched && !nameIsValid"
          class="text-red-500 text-sm mt-1"
        >
          الرجاء إدخال اسم صالح باللغة العربية أو الإنجليزية.
        </div>
      </div>

      <div class="mb-2">
        <input
          type="text"
          id="name"
          v-model="formData.username"
          class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
          placeholder="أدخل اسم المستخدم (باللغة العربية أو الإنجليزية)"
          required
          @blur="validateUsername"
        />
        <div
          v-if="usernameTouched && !usernameIsValid"
          class="text-red-500 text-sm mt-1"
        >
          الرجاء إدخال اسم مستخدم من كلمة واحدة باللغة العربية أو الإنجليزية.
        </div>
      </div>

      <!-- Phone Number Input -->
      <div class="mb-2">
        <input
          type="tel"
          id="phone"
          v-model="formData.phone"
          class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
          placeholder="أدخل رقم هاتفك (9 أرقام)"
          pattern="[0-9]{9}"
          required
          @blur="validatePhone"
        />
        <div
          v-if="phoneTouched && !phoneIsValid"
          class="text-red-500 text-sm mt-1"
        >
          الرجاء إدخال رقم هاتف مكون من 9 أرقام.
        </div>
      </div>

      <!-- Address Input -->
      <div class="mb-2">
        <input
          type="text"
          id="address"
          v-model="formData.address"
          class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
          placeholder="أدخل عنوانك"
          required
          @blur="validateAddress"
        />
        <div
          v-if="addressTouched && !addressIsValid"
          class="text-red-500 text-sm mt-1"
        >
          الرجاء إدخال العنوان .
        </div>
      </div>


      <!-- Password Input -->
      <div class="mb-2">
        <input
          type="password"
          id="password"
          v-model="formData.password"
          class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
          placeholder="أدخل كلمة المرور"
          required
          @blur="validatePassword"
        />
        <div
          v-if="passwordTouched && !passwordIsValid"
          class="text-red-500 text-sm mt-1"
        >
          كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل.
        </div>
      </div>

      <!-- Confirm Password Input -->
      <div class="mb-2">
        <input
          type="password"
          id="confirmPassword"
          v-model="formData.confirmPassword"
          class="mt-1 p-2 block w-full border rounded-md focus:bg-primary-opacity text-sm sm:text-base"
          placeholder="أعد إدخال كلمة المرور"
          required
          @blur="validateConfirmPassword"
        />
        <div
          v-if="confirmPasswordTouched && !confirmPasswordIsValid"
          class="text-red-500 text-sm mt-1"
        >
          كلمة المرور غير متطابقة.
        </div>
      </div>

      <!-- Submit Button -->
      <button
        :disabled="!isFormValid"
        type="submit"
        class="w-full mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-opacity2 focus:bg-primary-opacity"
      >
        تأكيد
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

const pictureInput = ref<HTMLInputElement | null>(null);

export default {
  data() {
    return {
      formData: {
        picture: null, // Store the picture file
        name: "John Doe", // Initial name
        username: "hamod",
        phone: "123456789", // Initial phone number
        address: "123 Main Street", // Initial address // Initial email
        password: "password123", // Initial password
        confirmPassword: "password123", // Initial password confirmation
      },
      nameRegex: /^[a-zA-Z\u0600-\u06FF\s]+$/,
      usernameRegex: /^[a-zA-Z\u0600-\u06FF]+$/,
      addressRegex: /^(?!$).*$/,
      phoneRegex: /^\d{9}$/,
      passwordRegex: /^.{6,}$/,
      nameTouched: false,
      usernameTouched: false,
      phoneTouched: false,
      addressTouched: false,
      passwordTouched: false,
      confirmPasswordTouched: false,
      pictureTouched: false,
    };
    
  },
  computed: {
    isFormValid() {
      return (
        this.nameIsValid &&
        this.usernameIsValid &&
        this.phoneIsValid &&
        this.addressIsValid &&
        this.passwordIsValid &&
        this.confirmPasswordIsValid
      );
    },
    nameIsValid() {
      return this.nameRegex.test(this.formData.name);
    },
    usernameIsValid() {
      return this.usernameRegex.test(this.formData.username);
    },
    phoneIsValid() {
      return this.phoneRegex.test(this.formData.phone);
    },
    addressIsValid() {
      return this.addressRegex.test(this.formData.address);
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
      return undefined;
    },
  },
  methods: {
    submitForm() {
      console.log("lll");
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
    validateUsername(){
      this.usernameTouched =true;
    },
    validatePhone() {
      this.phoneTouched = true;
    },
    validateAddress() {
      this.addressTouched = true;
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
