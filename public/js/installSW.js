(() => {
  if(navigator.serviceWorker) {
    navigator.serviceWorker.register(`${location.origin}/sw.js`, {scope: "/"})
      .then(res => {
        console.info(`こにちわ　ございます, Serwice-worker です \n ${res}`)
      })
      .catch(err => console.error(err))
  }
})()