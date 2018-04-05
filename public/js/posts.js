const transpile = (array = []) => {
  array = array[0].map((col, i) => array.map(row => row[i]))
  array = array.map(el => el.map(String).join(" "))
  return array
}

class Posts {
	constructor(
		config = {
			url: `${location.origin}/api/posts`,
			filteredUrl: `${location.origin}/api/filtered`,
			output: document.getElementById("list"),
			chunkSize: 6
		}
	) {
		this.url = config.url
		this.filteredUrl = config.filteredUrl
		this.chunkSize = config.chunkSize
		this.output = config.output
		this.template = []
		this.posts = []

		this.templates = 
		[
			[
				['a','a','a','b','b'],
				['c','c','d','d','d'],
				['e','e','e','f','f']
			]
		]

		this.render = this.render.bind(this)
	}

	errorHanlder(err) {
		alert(`there was an Error: \n${err}`)
		console.error(err)
	}

	load() {
		const reduceParsed = parsed => {
			let posts = []
			for (let i = 0; i < this.chunkSize; i++) {
				posts.push(parsed[i])
      } 
      return posts
		}

		return fetch(this.url)
			// .then(res => JSON.parse(res.json()))
			.then(reduceParsed)
			.then(posts => this.posts.concat(posts))
			.then(this.render)
			.catch(this.errorHanlder)

		
	}

	render(posts = this.posts) {
		const cols = Number(
			getComputedStyle(this.output).getPropertyValue("--cols")
    )
    const rows = Number(
			getComputedStyle(this.output).getPropertyValue("--rows")
		)
		
		const template = this.templates[
			Math.floor(Math.random() * this.templates.length)
		]
		
		const ready = transpile(template)
		this.template = this.template.concat(ready)
		this.output.style.setProperty("--template", `"${this.template.join('" "')}"`.replace(';', "") )
	}
}
