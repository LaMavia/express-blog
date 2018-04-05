module.exports = (post) => {
  const body = post.Body
  let newBody = body
    .split(/[{|}]/g)
    .filter(Boolean) // Every even ones are titles
    .map((str, i) => 
      !(i % 2)
        ? `<h2 class="main__posts__item__article__peak__header">${str}</h2>`
        : str
    )
    .join('')


  post.Body = newBody
  
  return post
}