<template>
  <div class="dark:bg-black bg-gray-200 min-w-full shadow-lg flex flex-col items-center">
    <form
      class="flex md:max-w-lg flex-row justify-between flex-nowrap pt-10"
    >
      <input
        v-model="keyWord"
        v:on
        class="w-56 md:w-80 p-1 px-2 dark:text-gray-200 rounded-md focus:outline-none focus:ring-1 ring-1 ring-gray-800 focus:ring-red-600 focus:border-transparent dark:bg-gray-800"
        placeholder="Введите слово для поиска"
        type="text"
      >
      <button
        class="mx-2 md:ml-8 dark:bg-gray-800 py-1 px-3 dark:text-gray-200 ring-1 ring-red-600 hover:bg-white rounded-md focus:outline-none"
        @click.prevent="getVideos"
      >
        Поиск
      </button>
    </form>
    <div class="h-10 py-2">
      <div
        v-if="videosToRender.length"
        class="dark:text-white cursor-default"
      >
        Результат поиска по запросу:
        <span class="px-1 text-red-500">{{ staticKeyWord }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
      this.setNewServiceMessage('Идет поиск...');
      this.resetVideosToRender();
      this.$router.push('/' + this.keyWord);
      this.staticKeyWord = this.keyWord;
      this.keyWord = '';
    }
  }
};
</script>
