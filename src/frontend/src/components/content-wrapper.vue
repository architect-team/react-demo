<template>
  <v-container>
    <v-row>
      <v-col
        :xl="12 - (xl * 2)"
        :offset-xl="xl"
        :lg="12 - (lg * 2)"
        :offset-lg="lg"
        :md="12 - (md * 2)"
        :offset-md="md"
        :sm="12 - (sm * 2)"
        :offset-sm="sm"
        cols="12"
        offset="0"
      >
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    gutters: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    xl() {
      return this.gutters;
    },

    lg() {
      return this.gutters - 1 > 0
        ? this.gutters - 1
        : 0;
    },

    md() {
      return this.gutters - 2 > 0
        ? this.gutters - 2
        : 0;
    },

    sm() {
      return this.gutters - 3 > 0
        ? this.gutters - 3
        : 0;
    },
  },
}
</script>
