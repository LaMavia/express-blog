(() => {
  // @ts-ignore
  const nav = new Nav()
  
  const form = document.getElementById("form")
  const loginF = document.getElementById("login")
  const passwordF = document.getElementById("password")
  const nameF = document.getElementById("name")
  const emailF = document.getElementById("email")

  const submitBtn = document.getElementById("submit")
  const visibilityBox = document.getElementById("vis")


  const hideError = () => {
    passwordF.classList.remove("main__form__field__input--error")
    loginF.classList.remove("main__form__field__input--error")
  }

  const showError = () => {
    passwordF.classList.add("main__form__field__input--error")
    loginF.classList.add("main__form__field__input--error")
  }

  /**@returns {Boolean} */
  const canSend = () => 
    passwordF.value && 
    loginF.value &&
    nameF.value &&
    emailF.value

  /**@param {ChangeEvent} e */
  const fieldChangeHandler = e => {
    e.currentTarget.classList.remove("main__form__field__input--error")
    if(canSend()) {
      submitBtn.disabled = false
    } else {
      submitBtn.disabled = true
    }
  }

  loginF.addEventListener("keyup", fieldChangeHandler, { passive: true })
  passwordF.addEventListener("keyup", fieldChangeHandler, { passive: true })
  emailF.addEventListener("keyup", fieldChangeHandler, { passive: true })
  nameF.addEventListener("keyup", fieldChangeHandler, { passive: true })

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
        Password: passwordF.value,
        Email: emailF.value,
        Name: nameF.value,
        Desc: "Hi there. I'm just a placeholder awaiting my master!"
      })

      hideError()
      fetch(`${location.origin}/api/add/user`, {
        body: data,
        method: "POST",
        credentials: 'include',
        redirect: 'follow',
        headers: new Headers({"Content-Type": "application/json"})
      })
        .then(res => {
          if(res.status === 201 || res.ok) {
            debugger
            fetch(`${location.origin}/api/login`, {
              body: JSON.stringify({
                Login: loginF.value,
                Password: passwordF.value
              }),
              method: "POST",
              credentials: 'include',
              redirect: 'follow',
              headers: new Headers({"Content-Type": "application/json"})
            })
              .then(res => {
                debugger
                if(res.status === 200 || res.ok)
                  location.href = location.origin
                else {
                  showError()
                }
              })
              .catch(err => console.error(new Error(err)))
          }
          else { showError() }
        })
        .catch(err => console.error(new Error(err)))
    }
  })

  
})()