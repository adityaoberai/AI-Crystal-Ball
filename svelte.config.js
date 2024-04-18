import adapter from '@sveltejs/adapter-vercel';
 
// This function can run for a maximum of 5 seconds
export default {
  kit: {
    adapter: adapter({
      maxDuration: 60,
    }),
  },
};