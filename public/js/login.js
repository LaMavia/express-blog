(() => {
  // @ts-ignore
  const nav = new Nav(window)

  const form = document.getElementById("form")
  const loginF = document.getElementById("login")
  const passwordF = document.getElementById("password")
  const submitBtn = document.getElementById("submit")
  const visibilityBox = document.getElementById("vis")


  /**@returns {Boolean} */
  const canSend = () => passwordF.value && loginF.value

  /**@param {Event} e */
  const fieldChangeHandler = e => {
    e.preventDefault()
    if(canSend()) {
      submitBtn.disabled = false
    } else {
      submitBtn.disabled = true
    }
  }

  loginF.addEventListener("change", fieldChangeHandler)
  passwordF.addEventListener("change", fieldChangeHandler)

  visibilityBox.addEventListener("change", e => {
    e.target.checked 
      ? passwordF.type = "text"
      : passwordF.type = "password"
  })

  form.addEventListener("submit", async e => {
    e.preventDefault()
    if(canSend()) {
      const data = JSON.stringify({
        Login: loginF.value,
        Password: passwordF.value
      })

      fetch(`${location.origin}/api/login`, {
        body: data,
        method: "POST",
        credentials: 'include',
        redirect: 'follow',
        headers: new Headers({"Content-Type": "application/json"})
      })
        .then(res => res.status)
        .then(console.dir)
        .catch(err => console.error(new Error(err)))
    }
  })

  
})()