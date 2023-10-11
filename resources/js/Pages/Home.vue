<template>
  <div>
    <homePageScreen/>
  </div>
</template>


<script lang="ts">
import adminsAccountsScreen from './appScreen/screens/adminAccountsScreen/adminsAccountsScreen.vue';
import homePageScreen from './appScreen/screens/homePageScreen/homePageScreen.vue'
import admins from './appScreen/screens/adminAccountsScreen/newAdmins/newAdminsScreen.vue';
export default {
  components: {
    adminsAccountsScreen,
    homePageScreen,
    admins,

  }
}
</script>
