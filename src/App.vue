<template>
  <div>
    <LoadingSpinner :show="isLoading" />
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import LoadingSpinner from "../src/layout/components/LoadingSpinner.vue";

const default_layout = "default";

export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.isLoading = true;
      next();
    });

    this.$router.afterEach(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 500); // mượt mà hơn
    });
  },
};
</script>
<style></style>