const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? {} : blogs.reduce((lastBlog, currentBlog) => (currentBlog.likes > lastBlog.likes ? currentBlog : lastBlog))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
