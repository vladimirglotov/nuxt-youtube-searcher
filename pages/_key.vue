<template>
  <div
    ref="videosRef"
    class="flex h-full md:p-3 items-center flex-col w-10/12 lg:w-3/4 xl:w-7/12 py-5"
  >
    <template v-if="videosToRender.length">
      <VideoCard
        v-for="(v, i) in videosToRender"
        :id="v.id"
        :key="v.id"
        :title="v.title"
        :channel-title="v.channelTitle"
        :publish-time="v.publishTime"
        :description="v.description"
        :image="v.image"
        :index="i"
        :video-height="videoHeight"
        class="md:flex shadow-lg bg-white dark:bg-gray-800 flex-col rounded-xl my-4 md:min-w-full"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoCard from '../components/VideoCard';

const RATIO = 1.778;

export default {
  components: { VideoCard },
  data: () => ({
    videoHeight: 0
  }),
  async fetch ({ store, route }) {
    try {
      await store.dispatch('fetchVideos', route.params.key);
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        store.dispatch('setNewServiceMessage', 'There might be network issues');
      } else if (e.message === 'Cannot read property id of undefined') {
        store.dispatch('setNewServiceMessage', 'No results found for your query');
      } else {
        store.dispatch('setNewServiceMessage', 'Something went wrong, please try again later');
      }
    }
  },
  computed: {
    ...mapState(['videosToRender']),
    ...mapState(['serviceMessage'])
  },
  mounted () {
    const container = this.$refs.videosRef;

    this.videoHeight = container.offsetWidth / RATIO;
  }
};
</script>
