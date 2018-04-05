const PostItemTemplate = (
	{ Title, Tags = [], Img = "http://placekitten.com/g/800/600", Body, _id },
	i) => {
  
	return `
  <li class="main__posts__item" 
      data-index="${i + 1}"
  >
    <a href="http://localhost:3000/posts/${_id}" class="main__posts__item__link">
      <img src="${Img}" alt="" class="main__posts__item__link__img"/>
      <article class="main__posts__item__link__article">
        <h2 class="main__posts__item__link__article__title">
          ${Title}
        </h2>
        <p class="main__posts__item__link__article__peak">
          ${Body.replace(/<.*>/g, "")}
        </p>
      </article>
    </a>
  </li>
  `
}
