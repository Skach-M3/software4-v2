export default {
  namespaced: true,
  state: {
    step: 1,
    taskName: "",
    principal: "",
    participants: "",
    disease: "",
    dataset: "",
    use_features: [],
    know_features: [],
    result: {},
  },
  getters: {},
  actions: {},
  mutations: {
    ChangeStep(state, step) {
      state.step = step;
    },
    ChangeTaskInfo(state, newInfo) {
      state = Object.assign(state, newInfo);
    }
  },
};
