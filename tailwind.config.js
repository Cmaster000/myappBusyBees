/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      // backgroundImage: {
      //   'honeycomb': "url('https://imgs.search.brave.com/4ZNbIFuWsE6uhP7mZzgY0SDS5hGII-lNFHstawFVVpY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzY0LzgzLzU4/LzM2MF9GXzY0ODM1/ODE4X1J3Q3hxWE12/UTdPWEYzYkR6d2FN/YnVzalFqRG1ZWjNx/LmpwZw')",
      //   'wood': "url('https://srv4.imgonline.com.ua/result_img/imgonline-com-ua-TextureSeamless-AMyfQPBLDZ.jpg')"
      // }

    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: ["bumblebee", "coffee",], 
    base: true,
      styled: true,
      utils: true,
  },
}

//  bg-[url('https://imgs.search.brave.com/4ZNbIFuWsE6uhP7mZzgY0SDS5hGII-lNFHstawFVVpY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzY0LzgzLzU4/LzM2MF9GXzY0ODM1/ODE4X1J3Q3hxWE12/UTdPWEYzYkR6d2FN/YnVzalFqRG1ZWjNx/LmpwZw')]

// 