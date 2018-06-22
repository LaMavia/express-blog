// @ts-check

class Slider {
	/**
	 * @param header {HTMLElement}
	 * @param imgs {Element[]} 
	 * @param articles {Element[]} 
	 */
	constructor(header, imgs, articles, time) {
		this.header = header
		this.imgs = imgs
		this.articles = articles
		this.n = 0
		this.time = time
		this.timeout = setInterval(this.change.bind(this), this.time)
	}

	change() {
		this.update()
		this.render()

		this.timeout
	}

	update() {
		this.n = this.n + 1 >= this.imgs.length 
			?	0
			: this.n + 1
	}

	render() {
		this.header.style.setProperty("--header-n", this.n)
	}

}






/*
class Slider {
	constructor(
		slides,
		config = {
			speed: "1s",
			buttonsHolder: document.getElementById("slider__btns"),
			buttonQuery: ".slider__btns__item__btn"
		}
	) {
		this.slides = document.getElementById("slider__slides")
		this.buttons = config.buttonsHolder
		this.btns
		this.length = slides.length
		this.current = 0
		this.items = slides
		this.config = config

		this.changeSlide = this.changeSlide.bind(this)
		this.resetTimeout = this.resetTimeout.bind(this)
		this.initSlides()
		this.initButtons()

		this.slides.style.setProperty("--speed", config.speed)

		this.rerender()
		this.timeout = setTimeout(this.changeSlide, 10000)
	}

	initSlides() {
		this.slides.innerHTML = ""
		this.items.forEach(slide => {
			this.slides.innerHTML += slideTemplate(
				slide.img,
				slide.title,
				slide.desc,
				slide.href
			)
		})
	}

	initButtons() {
		this.buttons.innerHTML = ""
		for (let i = 0; i < this.length; i++) {
			this.buttons.innerHTML += buttonTemplate(i)
		}
		this.btns = document.querySelectorAll(this.config.buttonQuery)

		// Side Buttons
		const prev = document.querySelector("button.slider__btn--prev")
		const next = document.querySelector("button.slider__btn--next")

		const btnEvent = (amount, boundry) => e => {
      this.current = boundry() 
        ? this.current + amount 
        : this.current
      this.rerender()
      this.resetTimeout()
		}

		prev.addEventListener("click", btnEvent(-1, () => this.current > 0))

		next.addEventListener(
			"click",
			btnEvent(1, () => this.current < this.length - 1)
		)

		// Bottom Buttons
		this.btns.forEach(btn => {
			console.log(btn)
			btn.addEventListener("click", e => {
        this.current = Number(
          e.currentTarget
            .attributes["data-index"].value
          )
        this.rerender()
        this.resetTimeout()
			})
		})
	}

	rerender() {
		this.slides.style.setProperty("--translate", `calc(${this.current * -1} * var(--w))`)
		// this.slides.scrollTo({behavior: "smooth", left: window.innerWidth * this.current, top: 0})
		if (this.btns.length > 0) {
			this.btns[this.current].checked = true
		}
	}

	changeSlide() {
		this.current++
		if (this.current >= this.length) this.current = 0
		this.rerender()
		this.timeout = setTimeout(this.changeSlide, 10000)
  }
  
  resetTimeout() {
		clearTimeout(this.timeout)
		this.timeout = null
    this.timeout = setTimeout(this.changeSlide, 10000)
  }
}

const PH = {
	title: "Cats will \nrule the world",
	desc: "Sceintists've known this for over a decade!",
	img: "http://placekitten.com/g/1280/720",
	href: "#"
}
*/
