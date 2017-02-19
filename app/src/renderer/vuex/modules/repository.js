const path = require('path')
const git = require('git-promise')
const electron = require('electron')
const storage = require('bluebird').promisifyAll(require('electron-json-storage'))
const fs = require('fs-extra-promise')
const { maybe } = require('ceed');

const state = {
  id: null,
  status: null,
  meta: {
    id: null,
    name: null,
    url: null
  }
}

const mutations = {
  initRepositoryMeta(state, repository) {
    state.id = repository.id
    state.status = 'loading'
    state.meta = repository
  },
  setRepositoryLoaded(state) {
    state.status = 'loaded'
  }
}

const getters = {}

const actions = {

  async recreateRepository ({ state, commit }) {

    await maybe('git init', {cwd: state.meta.location})
    const or = await maybe(`git remote add origin ${state.meta.url}`, {cwd: state.meta.location})

    await maybe('git stash', {cwd: state.meta.location})
    await maybe('git checkout master', {cwd: state.meta.location})

    await maybe('sleep 2')

    console.log('dd');
    commit('setRepositoryLoaded')

    console.log(state);
    console.log(or);
  },
  async updateRepository ({ state, rootState, commit, dispatch }, repositoryId) {

    if (!rootState.repositories.items) {
      await dispatch('setRepositories')
    }

    const repository = rootState.repositories.items.find(el => el.id === repositoryId)

    const repositoryLocation = path.join(rootState.repositories.repositoriesPath, repositoryId)

    await fs.ensureDir(repositoryLocation)

    commit('initRepositoryMeta', {
      id: repositoryId,
      name: repository.name,
      url: repository.url,
      location: repositoryLocation
    })

    await dispatch('recreateRepository')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
