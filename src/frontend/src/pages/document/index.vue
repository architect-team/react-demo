<template>
  <v-container>
    <nuxt-link class="light-blue--text" :to="{ name: 'index'}">
      Back to all results
    </nuxt-link>
    <v-card v-if="document" class="mt-4">
      <v-card-title class="headline">
        Result
      </v-card-title>
      <v-divider />
      <v-card-text>
        <pre class="pre-wrap">{{ JSON.stringify(document, null, 2) }}</pre>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const document = (await app.$axios.get(`/api/document/${params.id}`)).data;
    return { document };
  }
}
</script>

<style lang="scss" scoped>
.pre-wrap {
  white-space: pre-wrap;
}
</style>
