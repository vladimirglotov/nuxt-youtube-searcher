<template>
  <div class="md:w-full">
    <div class="md:min-w-full md:flex">
      <img
        ref="image"
        :class="[isOpen ? 'md:rounded-tl-lg' : 'md:rounded-l-lg', 'md:w-48', 'md:max-h-28', 'rounded-t-lg', 'md:h-auto', 'md:rounded-none', 'cursor-pointer']"
        :src="image"
        alt="Video preview"
        width="384"
        height="512"
        @click="isOpen = !isOpen"
      >
      <div
        class="md:p-1 md:px-2 max-w-sm md:max-w-none md:flex flex-col justify-between text-center md:text-left"
      >
        <p
          class="text-base dark:text-white font-semibold cursor-pointer"
          @click="isOpen = !isOpen"
        >
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
      ref="video"
      :class="[!isOpen && 'h-0', 'flex', 'rounded-b-lg']"
      width="100%"
      :height="videoHeight"
      :src="src"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    channelTitle: {
      type: String,
      default: ''
    },
    publishTime: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    videoHeight: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    isOpen: false
  }),
  computed: {
    src () {
      return 'https://www.youtube.com/embed/' + this.id;
    }
  }
};
</script>
