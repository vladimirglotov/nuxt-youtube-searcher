<template>
  <div class="flex card items-center flex-col w-10/12 lg:w-3/4 xl:w-7/12">
    <div
      v-if="videosToRender == false"
      class="md:p-1 text-white max-w-sm md:max-w-none text-center md:text-left cursor-default"
    >
      <h1>{{ serviceMessage || 'Здесь появятся результаты по вашему запросу' }}</h1>
    </div>
    <div
      v-for="(v, i) in videosToRender"
      v-else
      :key="v.id"
      class="md:flex shadow-lg bg-gray-800 flex-col rounded-xl my-2 md:min-w-full"
    >
      <div class="md:min-w-full md:flex">
        <img
          class="image md:w-48 md:max-h-28 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg cursor-pointer"
          :src="v.image"
          alt=""
          width="384"
          height="512"
          @click.prevent="openPlayer(i)"
        >
        <div
          class="md:p-1 md:px-2 max-w-sm md:max-w-none md:flex flex-col justify-between text-center md:text-left"
        >
          <p class="text-base text-white font-semibold cursor-pointer" @click.prevent="openPlayer(i)">
            {{ v.title }}
          </p>
          <div class="">
            <div class="md:flex md:flex-row text-gray-200 cursor-default">
              <div>
                {{ v.channelTitle }}
              </div>
              <div class="text-xs md:leading-7 md:ml-2 text-gray-400">
                {{ v.publishTime }}
              </div>
            </div>
            <p class="text-gray-400 text-xs cursor-default">
              {{ v.description }}
            </p>
          </div>
        </div>
      </div>
      <iframe
        class="video flex h-0 rounded-b-lg transition-all"
        width="100%"
        :height="calcVideoHeight()"
        :src="calcSrc(v.id)"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
  }),
  computed: {
    ...mapState(['videosToRender']),
    ...mapState(['serviceMessage'])
  },
  methods: {
    openPlayer (i) {
      const videos = document.querySelectorAll('.video')
      videos[i].classList.toggle('h-0')
      const images = document.querySelectorAll('.image')
      if (images[i].classList.contains('md:rounded-l-lg')) {
        images[i].classList.remove('md:rounded-l-lg')
        images[i].classList.add('md:rounded-tl-lg')
      } else {
        images[i].classList.add('md:rounded-l-lg')
        images[i].classList.remove('md:rounded-tl-lg')
      }
    },
    calcVideoHeight () {
      const container = document.querySelector('.card')
      if (container) {
        return (container.offsetWidth / 1.778)
      }
    },
    calcSrc (id) {
      return 'https://www.youtube.com/embed/' + id
    }
  }
}
</script>

<style>
</style>
