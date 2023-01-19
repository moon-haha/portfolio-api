import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      name: 'kim',
      dataset: [],
      datasetById: [],
      datasetByRating: [],
      datasetByCount: [],
      datasetByMD: [],
      datasetByCountForRank: [],
      datasetByIdForRank: [],
      datasetByRateForRank: [],
    };
  },
  mutations: {
    setDataset(state, data) {
      state.dataset = data;
    },
    sortDatasetByCount(state, data) {
      //
      state.datasetByCount = data;
      state.datasetByCount = state.datasetByCount.sort(function (a, b) {
        return b.rating.count - a.rating.count;
      });
      state.datasetByCount.length = 8;
    },
    sortDatasetById(state, data) {
      state.datasetById = data;
      state.datasetById = state.datasetById.sort(function (a, b) {
        return b.id - a.id;
      });
      state.datasetById.length = 8;
    },
    sortDatasetByRate(state, data) {
      state.datasetByRating = [...data];
      state.datasetByRating = state.datasetByRating.sort(function (a, b) {
        return b.rating.rate - a.rating.rate;
      });
      state.datasetByRating.length = 8;
    },
    sortDatasetByMD(state, data) {
      state.datasetByMD = [...data];
      state.datasetByMD = state.datasetByMD.sort(function (a, b) {
        return b.rating.rate - a.rating.rate;
      });
      state.datasetByMD.length = 2;
      console.log(state.datasetByMD);
    },
    sortDatasetByCountForRank(state, data) {
      state.datasetByCountForRank = [...data];
      state.datasetByCountForRank = state.datasetByCountForRank.sort(function (
        a,
        b,
      ) {
        return b.rating.count - a.rating.count;
      });
    },
    sortDatasetByIdForRank(state, data) {
      state.datasetByIdForRank = [...data];
      state.datasetByIdForRank = state.datasetByIdForRank.sort(function (a, b) {
        return b.id - a.id;
      });
    },
    sortDatasetByRateForRank(state, data) {
      state.datasetByRateForRank = [...data];
      state.datasetByRateForRank = state.datasetByRateForRank.sort(function (
        a,
        b,
      ) {
        return b.rating.rate - a.rating.rate;
      });
      state.datasetByRating.length = 8;
    },
  },
  actions: {
    getData(context) {
      axios
        .get(
          'https://hozouhp9x8.execute-api.ap-northeast-2.amazonaws.com/dev/api/products',
          //{ withCredentials: true }, 쿠키가 필요할 경우에
        )
        .then((result) => {
          context.commit('setDataset', [...result.data]);
          context.commit('sortDatasetByCount', [...result.data]);
          context.commit('sortDatasetById', [...result.data]);
          context.commit('sortDatasetByRate', [...result.data]);
          context.commit('sortDatasetByMD', [...result.data]);
          context.commit('sortDatasetByCountForRank', [...result.data]);
          context.commit('sortDatasetByIdForRank', [...result.data]);
          context.commit('sortDatasetByRateForRank', [...result.data]);

          //this.dataset = result.data;
          //this.dataset = result.data;
        });
    },
  },
});

export default store;
