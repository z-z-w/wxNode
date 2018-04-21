import * as types from './mutations-type'

const mutations = {
  [types.SET_MATH](state, math) {
    state.math = math;
  }
}

export default mutations