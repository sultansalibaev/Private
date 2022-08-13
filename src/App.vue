<template>
  <Content />
</template>

<script>
import Content from '@/components/Content.vue'

export default {
  name: 'App',
  components: {
    Content
  },
}
</script>

<style>
#app {
  display: flex;
  width: 100%;
  min-height: 91vh;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  /* text-align: center; */
  /* margin-top: 60px; */
  overflow: hidden;
}
</style>
