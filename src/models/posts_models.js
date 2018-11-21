const shortid = require('shortid')
const fs = require('fs')
const path = require('path')
const postFilePath = path.join(__dirname, '../../db/posts.json')

function getAll(){
    const { posts } = readData()
    return posts
}

function getOne(id){
    const { posts } = readData() 
   
    const post = posts.find(post => {return post.id === id})
    
    if (!post) {
        return error('no matching id found')
    } 
    return post
}

function create (title, content){
    const { posts } = readData() 

    if (!title) {
        return error('title is required')
     
    } else if (title.length > 100){
        return error('title cannot be longer than 100 letters')
   
    } else if (!content){
        return error('content is reqired')
    }

    const post = {id: shortid.generate(), title, content}
    posts.push(post)

    writeData(posts)
    return post
}

function deleteOne (id){
    const { posts } = readData() 

    const postIndex = posts.findIndex(post => {return post.id === id})
    
    if (postIndex === -1) {
        return error('no matching id found')
    }

    posts.splice(postIndex, 1)
    
    writeData(posts)
    return posts
}

function editOne (id, title, content){
    const { posts } = readData() 
   
    const post = posts.find(post => {return post.id === id})
    
    if (!post) {
        return error('no matching id found')
    } 
    if (content) {
        post.content = content
    } 
    if (title) {
        post.title = title
    } 
    
    writeData(posts)
    return post
}

function error(msg) {
    return { errors: msg }
}

function readData(){
    return {posts: JSON.parse(fs.readFileSync(postFilePath))}
}
function writeData(posts){
    return fs.writeFileSync(postFilePath, JSON.stringify(posts, null, 4))
}

module.exports = {
  getAll,
  getOne,
  create,
  editOne,
  deleteOne
}
