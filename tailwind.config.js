/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'building-bg': "url('https://images.pexels.com/photos/7078663/pexels-photo-7078663.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        'office-bg': "url('https://images.pexels.com/photos/534219/pexels-photo-534219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'people-bg': "url('https://img.freepik.com/free-photo/medium-shot-smiley-man-posing_23-2148243624.jpg?w=1380&t=st=1701377007~exp=1701377607~hmac=c1d5efdad283b893420a85220165687bfa309618e759f26dd1a43c3f9b8f1ac6')",
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
