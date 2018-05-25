import * as React from "react"
import { HashRouter as Router, Switch, Route} from 'react-router-dom'
import Models from "../../../../ShadowMS/types/models"
import cookieToObjArr from "../../../../ShadowMS/functions/cookieToObjArr"

import Nav from "./components/nav"
import PostEditor from "./components/postEditor"

import Home from "./routes/home"
import Posts from "./routes/posts"

interface S {
  post: Models.IPost
  posts: Models.Post[]
  showEditor: boolean
  navItems: Models.INavPage[]
  user: Models.User
}

export default class App extends React.PureComponent<{}, S> {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      post: {
        Title: "",
        Body: "",
        Author: {},
        Date: "12 2 2004",
        Desc: "",
        Img: "",
        Tags: [] as string[]
      } as Models.IPost,
      showEditor: false,
      navItems: [
        { Name: "Home",  Href: ""  },
        { Name: "Posts", Href: "posts" }
      ],
      user: {} as Models.User
    }

    this.submitPost = this.submitPost.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.updateImg = this.updateImg.bind(this)
    this.toggleEditor = this.toggleEditor.bind(this)
  }

  async componentDidMount() {
    const cookies = cookieToObjArr(document.cookie)

    const postsProm = await fetch(`${location.origin}/api/posts`)
    const userProm = await fetch(`${location.origin}/api/user${cookies["UserID"] ? '?id='+cookies["UserID"] : ""}`)

    Promise.all([postsProm, userProm])
      .then(resArr => resArr.map(it => it.json()))
      .then(async ([posts, user]) => {
        let p
        await posts.then(v => p = v)
        let u
        await user.then(v => u = v)
        this.setState({
          posts: p,
          user: u
        })
      })
  }

  submitPost(e) {

  }

  updatePost(post: Models.IPost) {
    this.setState({
      post
    })
  }

  updateImg(Img) {
    debugger
    this.setState({
      post: {
        ...this.state.post,
        Img
      }
    })
  }

  toggleEditor(show = !this.state.showEditor) {
    this.setState({
      showEditor: show
    })
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Nav items={this.state.navItems} openEditor={this.toggleEditor}/>
          {
            this.state.showEditor ?
              <PostEditor 
                post={Object.assign({}, this.state.post) }
                user={Object.assign({}, this.state.user)}
                onChange={this.updatePost}
                onImg={this.updateImg}
                onSubmit={this.submitPost}
                toggle={this.toggleEditor}
              />
            : ""
          }
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/posts" component={Posts.bind(this, {posts: this.state.posts})} posts={this.state.posts}/>
          </Switch>
        </div>
      </Router>
    )
  }
}