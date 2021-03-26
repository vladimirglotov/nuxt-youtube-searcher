<template>
  <div class="items-center min-h-screen pb-2 flex-col flex bg-gray-600">
    <div class="bg-black min-w-full shadow-lg mb-2 flex flex-col items-center">
      <form
        class="flex md:max-w-lg flex-row justify-between flex-nowrap pt-10"
      >
        <input
          v-model="keyWord"
          v:on
          class="w-56 md:w-80 p-1 px-2 text-gray-200 rounded-md focus:outline-none focus:ring-1 ring-gray-800 focus:ring-red-600 focus:border-transparent bg-gray-800"
          placeholder="Введите слово для поиска"
          type="text"
        >
        <button
          class="mx-2 md:ml-8 bg-gray-800 py-1 px-3 text-gray-200 ring-1 ring-red-600 hover:bg-red-600 hover:text-white rounded-md focus:outline-none"
          @click.prevent="getVideos"
        >
          Поиск
        </button>
      </form>
      <div class="h-10 py-2">
        <div v-if="videosToRender.length" class="text-white cursor-default">
          Результат поиска по запросу:
          <span class="px-1 text-red-500">{{ staticKeyWord }}</span>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data: () => ({
    keyWord: '',
    staticKeyWord: ''
  }),
  computed: mapState(['videosToRender']),
  methods: {
    ...mapActions([
      'fetchVideos',
      'setNewServiceMessage',
      'resetVideosToRender'
    ]),
    getVideos () {
      this.setNewServiceMessage('Идет поиск...')
      this.resetVideosToRender()
      this.staticKeyWord = this.keyWord
      this.fetchVideos(this.keyWord)
        .catch((e) => {
          console.log(e.message)
          if (e.message === 'Failed to fetch') {
            this.setNewServiceMessage('Вероятно есть неполадки с сетью')
          } else if (e.message === "Cannot read property 'id' of undefined") {
            this.setNewServiceMessage('По вашему запросу ничего не найдено')
          } else {
            this.setNewServiceMessage('Что-то пошло не так, попробуйте еще раз позже')
          }
        })
      this.keyWord = ''
    }
  }
}
</script>

<style>
</style>
