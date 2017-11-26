const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'UD is the best place to learn Redux',
    body: 'Everyone says so after all.  Vivamus ultrices blandit nisi, ut scelerisque velit venenatis a. Vivamus euismod lacinia felis, eget faucibus magna scelerisque et.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnerr": {
    id: '6ni6ok3ym7mf1p33lnerr',
    timestamp: 1068479767190,
    title: 'This one is deleted!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology. Maecenas sit amet orci sed urna maximus faucibus. Donec feugiat sapien in justo vehicula porttitor eu vel magna. Ut in leo massa. Integer hendrerit elit at sapien blandit egestas. Curabitur vehicula non ante ac lacinia. Integer porta est at sodales cursus. Fusce eget lorem convallis, ultricies turpis ut, varius diam.',
    author: 'thingone',
    category: 'react',
    voteScore: -40,
    deleted: true,
    commentCount: 0
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology. Maecenas sit amet orci sed urna maximus faucibus. Donec feugiat sapien in justo vehicula porttitor eu vel magna. Ut in leo massa. Integer hendrerit elit at sapien blandit egestas. Curabitur vehicula non ante ac lacinia. Integer porta est at sodales cursus. Fusce eget lorem convallis, ultricies turpis ut, varius diam.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "6ni6ok3ym7mf1p338877": {
    id: '6ni6ok3ym7mf1p338877',
    timestamp: 1468479767190,
    title: 'This is some title',
    body: 'Just kidding. It takes more than 10 minutes to learn technology. Vestibulum eu magna ipsum. Ut euismod ligula id tellus faucibus dictum. Maecenas eget elementum metus. Proin tristique egestas ligula sit amet suscipit. Phasellus quis rhoncus nisl',
    author: 'Benjamin Sigidi',
    category: 'redux',
    voteScore: 3,
    deleted: false,
    commentCount: 0
  },
  "6ni6ok3ym7mf1p338876": {
    id: '6ni6ok3ym7mf1p338876',
    timestamp: 1468479767190,
    title: 'Some of the title',
    body: 'Just kidding. It takes more than 10 minutes to learn technology. Vestibulum eu magna ipsum. Ut euismod ligula id tellus faucibus dictum. Maecenas eget elementum metus. Proin tristique egestas ligula sit amet suscipit. Phasellus quis rhoncus nisl',
    author: 'Benjamin Sigidi',
    category: 'redux',
    voteScore: 3,
    deleted: false,
    commentCount: 0
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
