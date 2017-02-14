const path = require('path')
const storage = require('bluebird').promisifyAll(require('electron-json-storage'))

const state = {
  repositoriesPath: '/tmp/el-app/repositories/',
  settingsFile: 'settings.json',
  items: null
}

const mutations = {
  setRepositories (state, repositories) {
    state.items = repositories
  },
  addRepository (state, repository) {
    state.items = [...state.items, repository]
  }
}

const getters = {
  settingsPath (state) {
    return path.join(state.repositoriesPath, state.settingsFile)
  }
}

const actions = {
  async readRepositories () {
    return storage.getAsync('repositories')
  },
  async updateRepositories ({ commit, dispatch }) {
    const savedRepositories = await dispatch('readRepositories')
    commit('setRepositories', savedRepositories || [])
  },
  async saveRepositories (_, items) {
    return storage.setAsync('repositories', items)
  },
  async addRepository ({ state, commit, dispatch }, repository) {
    commit('addRepository', repository)
    return dispatch('saveRepositories', state.items)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
