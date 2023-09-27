<template>
  <div>
    <adminsAccountsScreen/>
  </div>
</template>


<script lang="ts">
import adminsAccountsScreen from './appScreen/screens/adminAccountsScreen/adminsAccountsScreen.vue';
import homePageScreen from './appScreen/screens/homePageScreen/homePageScreen.vue'

export default {
  components: {
    adminsAccountsScreen,
    homePageScreen
  }
}
</script>
