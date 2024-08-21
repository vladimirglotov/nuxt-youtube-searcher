import { getSearchVideosSubString, getVideosArray } from './helpers';

export const state = () => ({
  videosToRender: [],
  serviceMessage: ''
});

export const mutations = {
  setVideosToRender (state, payload) {
    state.videosToRender = payload;
  },
  setServiceMessage (state, payload) {
    state.serviceMessage = payload;
  },
  clearVideosToRender (state) {
    state.videosToRender = [];
  }
};

export const actions = {
  async fetchVideos (context, payload) {
    const apiKey = process.env.API_KEY || '';
    const byKeyWordResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&q=${payload}&key=${apiKey}`);
    const videosByKeyWord = await byKeyWordResponse.json() || {};
    const searchVideosSubString = getSearchVideosSubString(videosByKeyWord.items || []);
    const fullInfoResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${searchVideosSubString}&key=${apiKey}`);
    const fullVideosInfo = await fullInfoResponse.json() || {};
    const videosArray = getVideosArray(fullVideosInfo.items || []);

    videosArray.sort((a, b) => a.viewCount < b.viewCount ? 1 : -1);

    context.commit('setVideosToRender', videosArray);
  },
  setNewServiceMessage ({ commit }, payload) {
    commit('setServiceMessage', payload);
  },
  resetVideosToRender ({ commit }) {
    commit('clearVideosToRender');
  }
};
