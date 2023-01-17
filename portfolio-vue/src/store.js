import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      name: 'kim',
      dataset: [],
    };
  },
  mutations: {
    /*
      dataset 데이터를 가져와서 state 변경 시킨다.

    */
    setDataset(state, data) {
      state.dataset = data;
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
          console.log(result.data);
          context.commit('setDataset', result.data);
          //this.dataset = result.data;
          //this.dataset = result.data;
        });
    },
  },
});

export default store;
