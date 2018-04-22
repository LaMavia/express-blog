// if('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('service-worker.js')
// } else {
//   console.log('no sw')
// }
/**
 * 
 */
const MySlider = new Slider(
  JSON.parse(document.getElementById("__slides__").value)
)
// const PostsLoader = new Posts()
// PostsLoader.load()