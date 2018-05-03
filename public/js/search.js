const onload = () => {
  const form = document.getElementById("search")
  form.addEventListener("submit", e => {
    e.preventDefault()
  })

  const submit = document.getElementById("submit")
  submit.addEventListener("click", e => {
    e.preventDefault()
    // const posts = [...document.querySelector(".search__posts").children]
    // posts.map(el => )
    const data = JSON.parse(document.getElementById("data").value)
    const filter = document.getElementById('filter').value
    const order  = document.getElementById('order').value
    console.log(data.map(el => {el.Date = new Date(el.Date); return el}))
    location.href = `${location.origin}${location.pathname}?filter=${filter}&order=${order}`
  })
  const nav = new Nav(window)
}

window.addEventListener("DOMContentLoaded", onload, { passive: true })