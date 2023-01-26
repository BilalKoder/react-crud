import React, { memo, useState } from "react";
import Swal from "sweetalert2";

function CreatePost(props) {
  const { baseUrl, getPosts } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleInputChangeHandler = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const bodyInputChangeHandler = (event) => {
    event.preventDefault();
    setBody(event.target.value);
  };

  const createPostFormSubmitHandler = (event) => {
    event.preventDefault();
    if (title == "") {
      Swal.fire("please fill title input field", "", "error");
      return;
    }
    if (body == "") {
      Swal.fire("please fill body input field", "", "error");
      return;
    }

    const formBody = {
      title,
      body,
    };

    fetch(`${baseUrl}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formBody),
    })
      .then(() => {
        setTitle("");
        setBody("");
        // close create post modal
        let $ = window.$;
        $("#create-post").modal("hide");
        getPosts();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="modal fade" id="create-post">
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
            <h4 className="modal-title">Create Post</h4>
          </div>
          <div className="modal-body">
            <form
              action=""
              method="POST"
              role="form"
              id="create-post-form"
              onSubmit={createPostFormSubmitHandler}
            >
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="post_title"
                  placeholder="Title"
                  onChange={titleInputChangeHandler}
                  value={title}
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
                  onChange={bodyInputChangeHandler}
                  value={body}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CreatePost);
