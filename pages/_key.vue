<template>
  <div class="flex card md:p-3 items-center flex-col w-10/12 lg:w-3/4 xl:w-7/12">
    <div
      v-if="videosToRender == false"
      class="md:p-1 dark:text-white max-w-sm md:max-w-none text-center md:text-left cursor-default"
    >
      <h1>{{ serviceMessage || 'Здесь появятся результаты по вашему запросу' }}</h1>
    </div>
    <div v-else>
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
import { mapState } from 'vuex'
import VideoCard from '../components/VideoCard'
export default {
  async fetch ({ store, route }) {
    try {
      await store.dispatch('fetchVideos', route.params.key)
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        store.dispatch('setNewServiceMessage', 'Вероятно есть неполадки с сетью')
      } else if (e.message === "Cannot read property 'id' of undefined") {
        store.dispatch('setNewServiceMessage', 'По вашему запросу ничего не найдено')
      } else {
        store.dispatch('setNewServiceMessage', 'Что-то пошло не так, попробуйте еще раз позже')
      }
    }
  },
  components: { VideoCard },
  data: () => ({
  }),
  computed: {
    ...mapState(['videosToRender']),
    ...mapState(['serviceMessage'])
  },
  methods: {
  }
}
</script>

<style>
</style>
