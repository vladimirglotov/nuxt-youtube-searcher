<template>
  <div class="md:w-full">
    <div class="md:min-w-full md:flex">
      <img
        class="image md:w-48 md:max-h-28 rounded-t-lg md:h-auto md:rounded-none md:rounded-l-lg cursor-pointer"
        :src="image"
        alt=""
        width="384"
        height="512"
        @click.prevent="openPlayer(index)"
      >
      <div
        class="md:p-1 md:px-2 max-w-sm md:max-w-none md:flex flex-col justify-between text-center md:text-left"
      >
        <p class="text-base dark:text-white font-semibold cursor-pointer" @click.prevent="openPlayer(index)">
          {{ title }}
        </p>
        <div class="">
          <div class="md:flex md:flex-row dark:text-gray-200 cursor-default">
            <div>
              {{ channelTitle }}
            </div>
            <div class="text-xs md:leading-7 md:ml-2 text-gray-400">
              {{ publishTime }}
            </div>
          </div>
          <p class="text-gray-400 text-xs cursor-default">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
    <iframe
      class="video flex h-0 rounded-b-lg transition-all"
      width="100%"
      :height="calcVideoHeight"
      :src="calcSrc(id)"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    channelTitle: String,
    publishTime: String,
    image: String,
    description: String,
    index: Number
  },
  data: () => ({
    calcVideoHeight: ''
  }),
  mounted () {
    const container = document.querySelector('.card')
    this.calcVideoHeight = container.offsetWidth / 1.778
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
    calcSrc (id) {
      return 'https://www.youtube.com/embed/' + id
    }
  }
}
</script>
