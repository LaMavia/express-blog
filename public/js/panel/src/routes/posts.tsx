import * as React from 'react'
import Models from "../../../../../ShadowMS/types/models"

interface P {
  posts: Models.Post[]
}

export default (props: P) => (
  <main className="main">
    <ol className="main__posts">
      {
        (props.posts ? props.posts : []).map((post, i) => (
          <li className="main__posts__item" key={i}>
            <a href={`${location.origin}/posts/${post._id}`} className="main__posts__item__link">
              <img src={post.Img} decoding="async" alt="" className="main__posts__item__link__img" />
              <article className="main__posts__item__link__article" style={{
                transform: 'translateY(-20%)',
                '--av': "hidden"
              } as any}>
                <time className="main__posts__item__link__article__date">{post.Date}</time>
                <h2 className="main__posts__item__link__article__title">{post.Title}</h2>
                <div className="main__posts__item__link__article__btns">
                  <button className="
                    main__posts__item__link__article__btns__btn
                    main__posts__item__link__article__btns__btn--green
                  ">
                    edit
                  </button>
                  <button className="
                    main__posts__item__link__article__btns__btn
                    main__posts__item__link__article__btns__btn--red
                  ">
                    delete
                  </button>
                </div>
              </article>
            </a>
          </li>
        ))
      }
    </ol>
    
  </main>
)