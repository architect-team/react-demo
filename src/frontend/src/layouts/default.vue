<template>
  <v-app light>
    <v-app-bar
      :clipped-left="true"
      fixed
      app
      color="light-blue"
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      fixed
      app
    >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Confirm.io'
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  color: white;
}
</style>
