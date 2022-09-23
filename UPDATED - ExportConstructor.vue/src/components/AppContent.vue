<template>
    <div class="content">
        <content-constructs />
        <content-sidebar :pdf="pdf" />
    </div>
</template>

<script>
import ContentConstructs from "@/components/Constructs/ContentConstructs.vue";
import ContentSidebar from "@/components/Sidebar/ContentSidebar.vue";

export default {
    props: {
        pdf: {
            required: true
        }
    },
    components: {
        ContentConstructs,
        ContentSidebar,
    },
};
</script>

<style scoped>
.content {
    display: flex;
    margin: 24px;
    height: 100%;
}
</style>