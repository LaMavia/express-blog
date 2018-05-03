(() => {
  const map = (a,b, x, d,c) => ((x-a) * (d-c) / (b-a)) + c
  const scrollBox = document.getElementById("wrapper")
  const progressBar = document.getElementById("progressBar")
  const post = document.querySelector("main.post")
  const header = document.querySelector("header.header")
  const nav = new Nav(scrollBox)

  const scrollHandler = e => {
    const postRects = post.getClientRects()[0]
    const headerRects = header.getClientRects()[0]
    
    const mapped = map(
      0, postRects.height, 
      postRects.height - scrollBox.scrollTop,
      0, 100
    )
    progressBar.style.setProperty(
      "--progress", 
      `${mapped > 100 ? 100 : mapped}%`
    )
  }

  scrollBox.addEventListener("scroll", scrollHandler, { passive: true })
  scrollBox.addEventListener("touchend", scrollHandler, { passive: true })

  console.log(nav)

})()

/**
 * _id: mongoose.IdObject
 * Login: string
 * Password: hashed(string)
 * Name: string
 * Posts: Models.Post[] filtered from 
 * 
 */