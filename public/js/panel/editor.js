// @ts-check

function setCookie(name, value) {
  document.cookie = `${name}=${value};path=/preview/;`
}

function getCookies() {
  const obj = {}
  const splited = document.cookie.split("=")
  for(let i = 0; i < splited.length; i+=2) {
    obj[splited[i]] = splited[i+1]
  }
  return obj
}

class Editor {
  /**
   * 
   * @param form {HTMLFormElement} 
   * @param imgInput {HTMLInputElement} 
   */
  constructor(form, imgInput, preview) {
    this.form = form
    this.imgInput = imgInput
    /**
     * @type String
     */
    this.img = ""
    /**
     * @type String
     */

    this.username = this.fetchUser()
    this.initListeners(this.form, this.imgInput, preview)
  }

  /**
   * 
   * @param {HTMLFormElement} form 
   * @param {HTMLInputElement} imgInput 
   * @param {HTMLLinkElement} preview 
   */
  initListeners(form, imgInput, preview) {
    form.addEventListener("submit", this.submitHandler.bind(this))
    imgInput.addEventListener("change", this.imgHandler.bind(this))
    preview.addEventListener("click", this.previewHandler.bind(this))
  }

  fetchUser() {
    let username
    fetch(`${location.origin}/api/user?id=${getCookies().UserID}`)
      .then(res => res.json())
      .then(user => {
        debugger
        this.username = user.Name
        return user.Name
      })
      .catch(err => {
        debugger
        // alert(`Psss... Send that: ${err} \n.to Devs at devs@true-blog.com\nYa'll be redirected to the landing page :)`)
        // setTimeout(_ => location.href = location.origin, 1000)
      })
      debugger
    return username
  }

  /**
   * 
   * @param {Event} e 
   */
  submitHandler(e) {
    e.preventDefault()
    // @ts-ignore
    const data = this.composeData(Array.from(e.target), ["img", "tags", "preview"])
    if(this.validateData(data)) {
      return this.submitPost(data)
    }
    // Shit went south - rejecting order! ☕
    const msg = new SpeechSynthesisUtterance('You forgot about something')
    speechSynthesis.speak(msg)
    console.log(data)
  }

  /**
   * @param e {Event} */
  imgHandler(e) {
    // @ts-ignore
    const file = e.target.files[0]
    const reader = new FileReader()
    let output = ""
    reader.onloadend = () => {
      this.img = reader.result
    }
    if(file.size <= 3000000)
      reader.readAsDataURL(file)
    else
      alert("Max file size: 3 MB")
  }

  /**
   * @param e {Event} 
   */
  previewHandler(e) {

    fetch(`${location.origin}/preview`, {
      body: JSON.stringify(this.composeData()),
      method: "POST",
      credentials: 'include',
      redirect: 'follow',
      headers: new Headers({"Content-Type": "application/json"})
    })
    .then(res => res.text())
    .then(res => {
      const win = window.open(`about:blank`, "_blank")
      win.document.write(res)
    })

  }

  validateData(data) {
    
    for(const prop in data) {
      if(/\[PH\]/g.test(data[prop]) || !data[prop]) return false
    }

    const isTheSame = JSON.stringify(Object.keys(data).sort()) === JSON.stringify([
      "Title", "Tags", "Desc", "Img", "Body", "Author", "Date"
    ].sort())
    debugger
    if(!isTheSame) return false

    return true
  }

  composeData() {
    // @ts-ignore
    const _data = this.composeObj(Array.from(this.form), ["img", "tags", "preview"])
    let data = {}

    for(const p in _data) {
      const [f,...res] = p.split('')
      res.unshift(f.toUpperCase())
      const name = res.join('')
      data = Object.assign(data, {
        // @ts-ignore
        [name]: _data[p]
      })
    }

    const d = new Date()
    return Object.assign(data, {
      Tags: this.form.tags.value.split(",") || "[PH]",
      Img: this.img || "[PH]",
      Author: this.username,
      Date: `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
    })
  }

  composeObj(inputs, skip = []) {
    return inputs
      // !!something - Parsing to Boolean
      .filter((it, i) => !!it.id && !skip.some(v => v === it.id))
      .map((it) => ({
        [it.id]: it.value || "[PH]"
      }))
      // .concat([{img: this.img}]) 
      .reduce((acc, ob) => {
        const k = Object.keys(ob)[0]
        return Object.assign(acc, ob)
      }, {})
  }

  submitPost(post) {
    let output = false
    fetch(`${location.origin}/api/add/post`, {
      method: "POST",
      body: JSON.stringify(post),
      credentials: 'include',
      redirect: 'follow',
      headers: new Headers({"Content-Type": "application/json"})
    })
    .then(res => {
      res.ok && res.status === 200 
      ? output = true
      : output = false
    })
    .catch(err => new Error(err))

    return output
  }
}

const myEditor = new Editor(
  // @ts-ignore
  document.getElementById("editor"),
  document.getElementById("img"),
  document.getElementById("preview")
)