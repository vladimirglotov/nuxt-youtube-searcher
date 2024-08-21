<template>
  <div class="flex h-full card md:p-3 items-center flex-col w-10/12 lg:w-3/4 xl:w-7/12">
    <div v-if="videosToRender.length">
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
        class="md:flex shadow-lg bg-white dark:bg-gray-800 flex-col rounded-xl my-4 md:min-w-full"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VideoCard from '../components/VideoCard';

export default {
  components: { VideoCard },
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
  }
};
</script>
