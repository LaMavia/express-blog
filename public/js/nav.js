// @ts-check

const defaultBlocks = [
	{
		activator: "#menuBtn",
		block: "#menu",
		activeClass: "nav__under__block--vis"
	},
	{
		activator: "#userBtn",
		block: "#user",
		activeClass: "nav__under__block--vis"
	},
	{
		activator: "#searchBtn",
		block: "#search",
		activeClass: "nav__bar__icon__block--vis"
	}
]
/**
 * @todo Add Blocks list to hide on press
 * @property sections {Element[]}
 */
class Nav {
	/**
	 * @param blocks {{activator: string, block: string, activeClass: string}[]} 
	 */
	constructor(blocks = defaultBlocks) {
		this.blocks = blocks
		this.nav = document.querySelector("nav.nav")
		this.sections = []

		this.initListeners()
	}

	initListeners() {
		this.blocks.forEach(block => {
			const activator = document.querySelector(block.activator)
			const section = document.querySelector(block.block)
			this.sections.push(section)
			if(activator) {
				activator.addEventListener("click", this.SwitchConstructor(
					activator,
					section, 
					this.sections,	
					block.activeClass
				), { passive: true, capture: true })
			} else throw new Error(`Couldn't find the activator: ${block.activator}`)
		})
	}

	/**
		* @param activator {Element}
		* @param target {Element} Target section
		* @param sections {Element[]}
		* @param activeClass {string}
	*/
	SwitchConstructor(activator, target, sections, activeClass) {
		return e => {
			this.HideAll(sections, activeClass, target)
			if(e.currentTarget === activator) 
				target.classList.toggle(activeClass)
		}
	}
	
	HideAll(sections, activeClass, target) {
		sections.forEach(section => {
			if(section !== target) section.classList.remove(activeClass)
		})
	}
}
console.log("loaded Nav")
/*
let foo = str => {
	console.time("perf")
	const o = str.split('').reduce((out, ltr) => {
		out[ltr] = out[ltr] ? out[ltr] + 1 : 1; return out
	},{})
	for(const k in o) {
		if(o[k] < 2) delete o[k]
	}
	const ks = Object.keys(o)
	console.timeEnd("perf")
	return ks.sort((a,b) => o[b] - o[a])
}
	
String.prototype[Symbol.iterator] = function* () {
	if (this.length > 1) {
		for (const i in this) yield this[i]
	} else {
		for (let code = 65; code <= this.charCodeAt(0); code++) {
			let c = String.fromCharCode(code)
			if ((/\w/).test(c)) yield c
		}
	}
}*/