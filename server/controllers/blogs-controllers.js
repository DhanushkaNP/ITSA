async function getAllBlogs(req, res, next) {
  res.send("All blogs");
}

async function createNewBlog(req, res, next) {
  res.send("Added new blog post");
}

async function updateBlog(req, res, next) {
  const blogId = req.params.bid;
  res.send(`Blog ${blogId} updated`);
}

async function deleteBlog(req, res, next) {
  const blogId = req.params.bid;
  res.send(`Blog ${blogId} deleted`);
}

exports.getAllBlogs = getAllBlogs;
exports.createNewBlog = createNewBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
