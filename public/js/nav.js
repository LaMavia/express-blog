// @ts-check

/*class Nav {
	constructor(scrollTarget) {
		this.target = scrollTarget
		this.nav = document.getElementById("nav")
		this.burger = document.getElementById("burger")
		this.search = document.getElementById("search")

		this.oldY = this.targetY

		if(this.target) {
			this.target.addEventListener("scroll", this.scrollHandler.bind(this), { passive: true })
			this.target.addEventListener("touchend", this.scrollHandler.bind(this), { passive: true })
		}
		else {
			alert("Ivnalid nav target")
			console.error("Invalid / undefined ScrollTarget")
		}

		this.burger.addEventListener("click", this.burgerHandler.bind(this))
		document.body.addEventListener("click", this.modalHandler.bind(this), { capture: true })
		this.search.addEventListener("submit", this.searchHandler.bind(this))
	}

	get targetY() {
		return this.target.scrollY 
			? this.target.scrollY 
			: this.target.scrollTop
	}

	scrollHandler(e){
		const Y = this.targetY
		const __navHeightString = getComputedStyle(this.nav).height
		const navHeight = Math.floor(
			Number(__navHeightString.substring(0, __navHeightString.length - 2))
		)
		if (Y > navHeight) {
			this.nav.classList.add("nav--sticky")
			const yD = this.oldY - Y
			this.oldY = Y
			if (yD < 0) {
				this.nav.classList.add("nav--sticky--hidden")
				this.nav.classList.remove("nav--sticky--shown")
			} else {
				this.nav.classList.remove("nav--sticky--hidden")
				this.nav.classList.add("nav--sticky--shown")
			}
		} else {
			this.nav.classList.remove("nav--sticky")
		}
	}

	burgerHandler(e) {
		this.nav.classList.toggle("nav--open")
	}

	modalHandler(e) {
		if(e.target === document.body) 
			this.nav.classList.remove("nav--open")
	}

	searchHandler(e) {
		e.preventDefault()
		window.location.href = `${location.origin}/search?filter=${
			e.target[0].value
		}&order=newest`
	}
}
*/
/**
 * 
 * @param target {HTMLElement}
 * @param activeClass {string}
 */
const SwitchConstructor = (target, activeClass) => e => {
	target.classList.toggle(activeClass)
}


const defaultBlocks = [{
	activator: "#menuBtn",
	block: "#menu",
	activeClass: "nav__under__block--vis"
}]
class Nav {
	/**
	 * @param blocks {{activator: string, block: string, activeClass: string}[]} 
	 */
	constructor(blocks = defaultBlocks) {
		this.blocks = blocks;
		debugger
		this.blocks.forEach(block => {
			const activator = document.querySelector(block.activator)
			if(activator) {
				activator.addEventListener("click", SwitchConstructor(
					document.querySelector(block.block), 
					block.activeClass
				))
			} else throw new Error(`Couldn't find the activator: ${block.activator}`)
				
		})
	}
}
console.log("loaded Nav")
