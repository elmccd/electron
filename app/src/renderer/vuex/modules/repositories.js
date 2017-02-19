const path = require('path')
const electron = require('electron')
const storage = require('bluebird').promisifyAll(require('electron-json-storage'))
const fs = require('fs-extra-promise')

const state = {
  repositoriesPath: path.join(electron.remote.app.getPath('appData'), 'electron-app'),
  items: null
}

const mutations = {
  setRepositories (state, repositories) {
    state.items = repositories
  },
  addRepository (state, repository) {
    state.items = [...state.items, repository]
  },
  removeRepository (state, repositoryId) {
    console.log(repositoryId, state.items);
    state.items = state.items.filter(e => e.id !== repositoryId)
  }
}

const getters = {

}

const actions = {
  async readRepositories () {
    return storage.getAsync('repositories')
  },
  async setRepositories ({ commit, dispatch }) {
    const savedRepositories = await dispatch('readRepositories')
    commit('setRepositories', savedRepositories || [])
  },
  async initRepositoriesDirs ({ state }) {
    await fs.ensureDir(state.repositoriesPath)
  },
  async saveRepositories (_, items) {
    return storage.setAsync('repositories', items)
  },
  async addRepository ({ state, commit, dispatch }, repository) {
    commit('addRepository', repository)
    return dispatch('saveRepositories', state.items)
  },
  async removeRepository ({ state, commit, dispatch }, repositoryId) {
    commit('removeRepository', repositoryId)
    return dispatch('saveRepositories', state.items)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
