import { useCommentContext } from '../../context/comment_context';
import Comment from './Comment';

const Comments = ({feedbackId}) => {
  const {comments} = useCommentContext();

  return (
    <div className="comments-container">
      <h3>{comments.length} Comments</h3>
      {comments.map(comment => {
        const {id, replies} = comment;
        return <div key={id} className={`comment-holder${replies.length > 0 ? ' has-replies' : ''}`}>
          <Comment feedbackId={feedbackId} {...comment} />
          {replies.length > 0 && <div className="comments-sub">
            {replies.map(reply => {
              return <Comment 
                key={reply.id}
                feedbackId={feedbackId}
                parentId={id}
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