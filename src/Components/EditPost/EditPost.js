import React, { memo, useEffect, useState } from "react";

function EditPost(props) {
  const { editPostData, baseUrl, getPosts } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    setTitle(editPostData?.title);
    setBody(editPostData?.body);
    setEditPostId(editPostData?.id);
  }, [editPostData]);

  const titleInputChangeHandler = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const bodyInputChangeHandler = (event) => {
    event.preventDefault();
    setBody(event.target.value);
  };

  const onEditFormSubmitHandler = (event) => {
    event.preventDefault();
    const formBody = {
      title,
      body,
    };

    fetch(`${baseUrl}/posts/${editPostId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formBody),
    })
      .then(() => {
        setTitle("");
        setBody("");
        getPosts();

        let $ = window.$;
        $("#edit-post-modal").modal("hide");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="modal fade" id="edit-post-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title">Edit Post</h4>
          </div>
          <div className="modal-body">
            <form
              onSubmit={onEditFormSubmitHandler}
              method="POST"
              role="form"
              id="create-post-form"
            >
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="post_title"
                  placeholder="Title"
                  value={title}
                  onChange={titleInputChangeHandler}
                />
              </div>

              <div className="form-group">
                <label>Body</label>
                <textarea
                  name=""
                  id="post_body"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  value={body}
                  onChange={bodyInputChangeHandler}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Update Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(EditPost);
