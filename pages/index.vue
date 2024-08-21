<template>
  <div class="flex items-center justify-center absolute top-20 bottom-0 right-0 left-0 mt-8">
    <PulseLogo logo-src="youtube-icon.png" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['videosToRender']),
    ...mapState(['serviceMessage'])
  }
};
</script>
