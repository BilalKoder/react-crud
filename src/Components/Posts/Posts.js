import React, { memo } from "react";

function Posts(props) {
  // const posts = props?.posts;
  const { posts, deletePost, editPost } = props;

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Post Id</th>
          <th>User Id</th>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody id="posts-listing">
        {posts.map((singlePost) => {
          return (
            <tr key={singlePost.id}>
              <td>{singlePost.id}</td>
              <td>{singlePost.userId}</td>
              <td>{singlePost.title}</td>
              <td>
                <a
                  href="#"
                  className="btn btn-primary"
                  onClick={(event) => editPost(event, singlePost.id)}
                >
                  Edit
                </a>
              </td>
              <td>
                <a
                  href="#"
                  className="btn btn-danger"
                  onClick={(event) => deletePost(event, singlePost.id)}
                >
                  Delete
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default memo(Posts);
