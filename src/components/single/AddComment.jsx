const AddComment = () => {
  return (
    <div className="comment-add">
      <h3>Add Comment</h3>
      <form>
        <div className="form-group">
          <textarea className="comment-add-textarea form-control" placeholder="Type your comment here"></textarea>
          <span className="form-control-error"></span>
        </div>
        <div>
          <p className="comment-char-left">
            250 Characters Left
          </p>
          <button type="button" className="btn btn-purple">Post Comment</button>
        </div>
      </form>
    </div>
  )
}

export default AddComment;