<template>
  <div class="dark:bg-black bg-gray-200 min-w-full shadow-lg flex flex-col items-center">
    <form
      class="flex md:max-w-lg flex-row justify-between flex-nowrap pt-10"
    >
      <input
        id="keyWord"
        v-model="keyWord"
        v:on
        class="w-56 md:w-80 p-1 px-2 dark:text-gray-200 rounded-md focus:outline-none focus:ring-1 ring-1 ring-gray-800 focus:ring-red-600 focus:border-transparent dark:bg-gray-800"
        placeholder="Enter a keyword for search"
        type="text"
      >
      <button
        class="mx-2 md:ml-8 ring-1 ring-red-600 hover:bg-white rounded-md focus:outline-none focus:bg-red-600 focus:text-white focus:ring-red-600 dark:bg-gray-800 py-1 px-3 dark:text-gray-200 dark:focus:bg-red-600  dark:focus:ring-black dark:focus:text-black"
        @click.prevent="getVideos"
      >
        Search
      </button>
    </form>
    <div class="h-10 py-2">
      <div
        v-if="videosToRender.length"
        class="dark:text-white cursor-default"
      >
        Search results for the query:
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
  mounted () {
    if (this.$route.path && !this.staticKeyWord) {
      this.staticKeyWord = this.$route.path.startsWith('/') ? this.$route.path.slice(1) : this.$route.path;
    }
  },
  methods: {
    ...mapActions([
      'setNewServiceMessage',
      'resetVideosToRender'
    ]),
    getVideos () {
      this.setNewServiceMessage('Searching...');
      this.resetVideosToRender();
      this.$router.push('/' + this.keyWord);
      this.staticKeyWord = this.keyWord;
      this.keyWord = '';
    }
  }
};
</script>
