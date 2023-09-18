// https://nuxt.com/docs/api/configuration/nuxt-config

// import { io } from "socket.io-client";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-socket-io'],
  // plugins: [
  //   {
  //     src: io,
  //     inject: {
  //       'window.io': io({
  //         // The URL of the Socket.io server
  //         url: 'http://localhost:3002'
  //       })
  //     }
  //   }
  // ]
  // io: {
  //   sockets: [
  //     {
  //       name: 'home',
  //       url: 'http://localhost:3002',
  //       default: true,
  //     }
  //   ]
  // }
})


