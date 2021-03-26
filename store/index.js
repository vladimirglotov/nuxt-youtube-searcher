import { sliceString, dateFormat } from './helpers'

export const state = () => ({
  // apiKey: 'AIzaSyA2CWPbc5gpeoeRzVUZJLKSHlqAm76hVyg',
  apiKey: 'AIzaSyCnrtoFJVKfSWDPn8DRjyAAHvlAicQkVk8',
  videosToRender: [],
  serviceMessage: ''
})

export const mutations = {
  setVideosToRender (state, payload) {
    state.videosToRender = payload
  },
  setServiceMessage (state, payload) {
    state.serviceMessage = payload
  },
  clearVideosToRender (state) {
    state.videosToRender = []
  }
}

export const actions = {
  async fetchVideos (context, payload) {
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&q=${payload}&key=${context.state.apiKey}`)
    const videosByKeyWord = await res.json()
    const videosArray = []
    const fullRes = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videosByKeyWord.items[0].id.videoId}%2C${videosByKeyWord.items[1].id.videoId || ''}%2C${videosByKeyWord.items[2].id.videoId || ''}%2C${videosByKeyWord.items[3].id.videoId || ''}%2C${videosByKeyWord.items[4].id.videoId || ''}%2C${videosByKeyWord.items[5].id.videoId || ''}%2C${videosByKeyWord.items[6].id.videoId || ''}%2C${videosByKeyWord.items[7].id.videoId || ''}%2C${videosByKeyWord.items[8].id.videoId || ''}%2C${videosByKeyWord.items[9].id.videoId || ''}&key=${context.state.apiKey}`)
    const fullVideosData = await fullRes.json()
    await fullVideosData.items.map((video) => {
      videosArray.push({
        id: video.id,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        description: sliceString(video.snippet.description) || '',
        publishTime: dateFormat(video.snippet.publishedAt),
        image: video.snippet.thumbnails.medium.url,
        viewCount: +video.statistics.viewCount
      })
      videosArray.sort((a, b) => a.viewCount < b.viewCount ? 1 : -1)
      return videosArray
    })
    context.commit('setVideosToRender', videosArray)
  },
  setNewServiceMessage ({ commit }, payload) {
    commit('setServiceMessage', payload)
  },
  resetVideosToRender ({ commit }) {
    commit('clearVideosToRender')
  }
}

export const getters = {
  getApiKey (state) {
    return state.apiKey
  }
}
