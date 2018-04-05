;(() => {
	const templates = {
    big: (post, i) => `
      <li class="main__posts__item  main__posts__item--big" 
      data-index="${i + 1}">
        <a href="${location.origin}/posts/${post._id}" class="main__posts__item__link">
          <img src="${post.Img}" class="main__posts__item__link__img"/>
          <article class="main__posts__item__link__article">
            <time class="main__posts__item__link__article__date">${post.Date}</time>
            <h2 class="main__posts__item__link__article__title">${post.Title}</h2>
            <div class="main__posts__item__link__article__line"></div>
            <p class="main__posts__item__link__article__desc">${post.Desc}</p>
          </article>
        </a>
      </li>
    `,
    small: (post, i) => `
      <li class="main__posts__item  main__posts__item--small" 
      data-index="${i + 1}">
        <a href="${location.origin}/posts/${post._id}" class="main__posts__item__link">
          <img src="${post.Img}" class="main__posts__item__link__img"/>
          <article class="main__posts__item__link__article">
            <time class="main__posts__item__link__article__date">${post.Date}</time>
            <h2 class="main__posts__item__link__article__title">${post.Title}</h2>
            <div class="main__posts__item__link__article__line"></div>
            <p class="main__posts__item__link__article__desc">${post.Desc}</p>
          </article>
        </a>
      </li>
  `
  }
  
	const templater = (el, i, arr) => 
		i == 1 || i == 2 || i == 5 
		? templates.small(el,i) 
		: templates.big(el,i)

	const errorHandler = err => {
		setTimeout(() => {
			throw new Error(err)
		})
  }

	const nav = document.getElementById("nav")
	document.getElementById("burger").addEventListener("click", e => {
			e.preventDefault()
			nav.classList.toggle("nav--open")
		},true)

	document.body.addEventListener(
		"click",
		e => {
			if (nav.classList.contains("nav--open")) {
				nav.classList.remove("nav--open")
			}
		},
		{capture: true}
	)

	window.addEventListener("scroll", e => {
		const __navHeightString = getComputedStyle(nav).height
		const navHeight = Math.floor(Number(__navHeightString.substring(0, __navHeightString.length - 2)))
		if( window.scrollY > navHeight ) {
			nav.classList.add("nav--sticky")
		} else {
			nav.classList.remove("nav--sticky")
		}
	}, { passive: true })

	document.getElementById("search").addEventListener("submit", e => {
		e.preventDefault()
		window.location.href = `${location.origin}/search?filter=${e.target[0].value}`
		/*const list = document.getElementById("list")
		const filter = e.target[0].value
		let posts
		fetch(`${location.origin}/api/filtered?filter=${filter}`)
			.then(res =>
				res.text()
					.then(text => {
						list.attributes.n = list.attributes.n ? list.attributes.n + 1 : 1
						list.style.setProperty("--n", list.attributes.n)
            list.innerHTML = JSON.parse(text)
              .filter((el, i) => i < 6)
							.map(templater)
							.join("")
					})
					.catch(errorHandler)
			)
			.catch(errorHandler)
		*/
	})
})()
