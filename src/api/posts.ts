import axios from './axios'

const posts = (q: string) => {
  return axios.get(`/posts?${q}`)
}

const post = (id: number) => {
  return axios.get(`/posts/${id}`)
}

const users = (id: number) => {
  return axios.get(`/users/${id}`)
}

const comments = (id: number) => {
  return axios.get(`/posts/${id}/comments`)
}

export default {
  posts,
  users,
  post,
  comments
}