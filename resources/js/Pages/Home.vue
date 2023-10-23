<template>
  <div>
    </>
  </div>
</template>


<script lang="ts">
import adminsAccountsScreen from './appScreen/screens/adminAccountsScreen/adminsAccountsScreen.vue';
import homePageScreen from './appScreen/screens/homePageScreen/homePageScreen.vue'
import admins from './appScreen/screens/adminAccountsScreen/newAdmins/newAdminsScreen.vue';
import handle from './appScreen/screens/handledOrderScreen/handledOrderScreen.vue';
import history from "./appScreen/screens/orderHistoryScreen/orderHistoryScreen.vue";
import sellers from "./appScreen/screens/sellersAccountsScreen/sellersAccountsScreen.vue";
import customers from "./appScreen/screens/customersAccountsScreen/customersAccountsScreen.vue";
import eAdmins from './appScreen/screens/adminAccountsScreen/editAdmins/editAdminsScreen.vue'
import login from './loginScreen/screens/loginScreen.vue';

export default {
  components: {
    login,
    adminsAccountsScreen,
    homePageScreen,
    admins,
    handle,
    history,
    sellers,
    customers,
    eAdmins,

  }
}
</script>
