import sidebarVue from '../../components/sidebar.vue'
import headerVue from '../../components/header.vue'

declare var localStorage: any

export default {
    data() {
        return {
            selectedContent: 'home',
            isSidebarClosed: false, // Set the default selected content
        }
    },

    components: {
        headerVue,
        sidebarVue,
    },

    props: {
        selectedContent: String, // Receive the selected content from the parent component
    },

    created() {
        const storedContent = localStorage.getItem('selectedContent')
        if (storedContent) {
            this.selectedContent = storedContent
        }
        const isClosed = localStorage.getItem('isSidebarClosed')
        if (isClosed !== null) {
            this.isSidebarClosed = isClosed === 'true'
        }

        // Add screen size detection to the created hook
        this.checkScreenSize()

        // Add a window resize event listener to update when the screen size changes
        window.addEventListener('resize', this.checkScreenSize)
    },

    beforeDestroy() {
        // Remove the window resize event listener when the component is destroyed
        window.removeEventListener('resize', this.checkScreenSize)
    },

    methods: {
        changeContent(content) {
            // Update the selected content based on the sidebar click
            this.selectedContent = content
            // Store the selected content in localStorage
            localStorage.setItem('selectedContent', content)
        },
        toggleSidebarWidth() {
            this.isSidebarClosed = !this.isSidebarClosed
            localStorage.setItem(
                'isSidebarClosed',
                this.isSidebarClosed.toString()
            )
        },
        checkScreenSize() {
            const screenWidth = window.innerWidth
            const threshold = 768 // You can adjust this threshold as needed

            if (screenWidth < threshold) {
                // Screen is small, set a value or perform an action for small screens
                this.isSidebarClosed = true
            } else {
                this.isSidebarClosed = false
            }
        },
    },
}
