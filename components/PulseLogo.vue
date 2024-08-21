<template>
  <img
    :src="logoSrc"
    alt="Logo"
    class="w-36 h-36 animate-pulse transform transition-transform duration-200 ease-in-out"
  />
</template>

<script>
export default {
  name: 'PulseLogo',
  props: {
    logoSrc: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>
