<template>
    <main>
        <div v-if="selectedContent === 'home'">
            <HomeContent />
        </div>
        <div v-else-if="selectedContent === 'admin-accounts'">
            <AdminAccountsContent />
        </div>
    </main>
</template>


<script lang="ts">
import HomeContent from './homeContent.vue';
import AdminAccountsContent from './adminsAccountsContent.vue';

export default {
    components: {
        HomeContent,
        AdminAccountsContent
    },

    props: {
        selectedContent: String, // Receive the selected content from the parent component
    },
};
</script>