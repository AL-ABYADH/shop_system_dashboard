<template>
  <div>
    <loginVue/>
  </div>
</template>


<script lang="ts">
import appVue from './containers/app.vue';
import loginVue from './containers/login.vue'

export default {
  components: {
    appVue,
    loginVue
  }
}
</script>
