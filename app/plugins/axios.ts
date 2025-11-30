import axios from 'axios'

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: 'http://localhost:3001', 
  })

  return {
    provide: {
      api,
    },
  }
})
