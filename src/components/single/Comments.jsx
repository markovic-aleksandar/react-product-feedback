import Comment from './Comment';

const Comments = ({feedbackId, comments}) => {
  
  return (
    <div className="comments-container">
      <h3>{comments.length} Comments</h3>
      {comments.map(comment => {
        const {id, replies} = comment;
        return <div key={id} className={`comment-holder${replies ? ' has-replies' : ''}`}>
          <Comment feedbackId={feedbackId} {...comment} />
          {replies && <div className="comments-sub">
            {replies.map(reply => {
              return <Comment 
                key={reply.id}
                feedbackId={feedbackId}
                {...reply} 
              />
            })}
          </div>}
        </div>
      })}
    </div>
  )
}

export default Comments;