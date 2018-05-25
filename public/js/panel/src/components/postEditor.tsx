import * as React from 'react'
import Models from "../../../../../ShadowMS/types/models"
import formatPages from "../../../../../ShadowMS/functions/formatPages"
import * as mdInit from "markdown-it"
// import * as markdown_it_footnote from "markdown-it-footnote"
// import * as markdown_it_imsize from "markdown-it-imsize"

type PostHandler = (p: Models.IPost) => void
type ImageHandler = (img: string) => void
type Switch = (o: boolean) => void

interface P {
  post: Models.IPost
  user: Models.User
  onChange: PostHandler
  onImg: ImageHandler
  onSubmit: PostHandler
  toggle: Switch
}

interface S {
  preview: boolean
  post: Models.IPost
}

const postTemplate = `doctype html
div.wrapper#wrapper
  header.header
    img.header__img(src= \`\${/https?/g.test(post.Img) ? post.Img : \`../\${post.Img}\`}\`, alt="")
    h1.header__title #{post.Title}
    if author
      a.header__author(href=\`\${home}/users/\${String(author._id)}\`)
        img.header__author__img(
          src= \`data:image/jpg;base64, \${author.Img}\`
        )
        p.header__author__name #{author.Name}

  main.post !{post.Body}
  div.progress
    div.progress__bar#progressBar
`

const md = mdInit({
	html: true,
	linkify: true,
	typographer: true
})


export default class postEditor extends React.PureComponent<P, S>{ 
  constructor(props: P) {
    super(props)
    this.state = {
      preview: false,
      post: {} as Models.IPost
    }

    this.submitHandler = this.submitHandler.bind(this)
    this.imageHandler = this.imageHandler.bind(this)
    this.bodyHandler = this.bodyHandler.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
    this.exit = this.exit.bind(this)
  }

  componentWillUnmount() {
    this.props.onChange(this.state.post)
  }

  submitHandler(e: Event) {
    debugger
  }

  imageHandler(e: Event) {
    debugger
    // @ts-ignore
    const file = e.currentTarget.files[0];
    if(!((/\.(jpg|jpeg|png)$/i).test(file.name))) {
      return 
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.onImg(reader.result)
    }
    reader.readAsDataURL(file);
  }

  bodyHandler(e: Event) {
    debugger
  }

  togglePreview() {
    this.setState({
      preview: !this.state.preview
    })
  }

  exit(e) {
    this.props.toggle(false)
  }

  render() {
    return (
      <div className="editor">
        <div className="editor__utils">
          <button className={`editor__utils__btn ${this.state.preview ? "editor__utils__btn--active": ""}`} onClick={this.togglePreview}>
            preview
          </button>
          <button className="editor__utils__btn" onClick={this.exit}>
            exit
          </button>
        </div>
        <form className="editor__edit" onSubmit={this.submitHandler}>
          <label htmlFor="title" className="editor__edit__block"> Title
            <input type="text" id="title" name="title" className="editor__edit__block__input editor__edit__block__input--title"/>
          </label>
          <label htmlFor="img" className="editor__edit__block editor__edit__block--small"> Image
            <input 
              type="file" name="img" id="img" onChange={this.imageHandler}
              className="editor__edit__block__btn"
            />
          </label>
          <label htmlFor="body" className="editor__edit__block editor__edit__block--big"> Body
            <textarea name="body" id="body" onChange={this.bodyHandler}
              className="editor__edit__block__input editor__edit__block__input--body"
            ></textarea>
          </label>
        </form>
        {
          (this.state.preview) ?
            <section className="editor__preview" dangerouslySetInnerHTML={{__html: pug.compile(postTemplate)({
                title: "Express",
                home: location.origin,
                pages: formatPages({"":[]}, ""),
                post: {
                  ...this.props.post,
                  Body: md.render(this.props.post.Body)
                },
                author: this.props.user,
              })}}>
            </section>
          : ""
        }
      </div>
  )}
}
/**
 * render(postTemplate)({
            title: "Express",
            home: location.origin,
            pages: formatPages({"":[]}, ""),
            post,
            author: user,
            user: undefined
          })
 */