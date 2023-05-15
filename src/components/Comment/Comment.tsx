import React from 'react';
import _ from 'lodash';

export interface CommentI {
  comments: Array<CommentI>;
  level: number;
  commentsCount: number;
  content: string;
  id: number;
  time: number;
  timeAgo: string;
  time_ago?: string;
  type: string;
  url: string;
  user: string;
}

export interface CommentPropI {
  comments: Array<CommentI>;
}

const Comment: React.FunctionComponent<CommentPropI> = (props) => {
  return (
    <div className="d-flex flex-column">
      {props.comments.map((comment) => {
        return (
          <div key={_.uniqueId()} className="d-flex flex-column mx-2 my-2 border py-2 px-2">
            <div className="d-flex justify-content-end">
              <div className="me-2">{comment.timeAgo ? comment.timeAgo : comment.time_ago}</div>
              <div className="fw-lighter">{comment.user}</div>
            </div>
            <div className="d-flex flex-column" dangerouslySetInnerHTML={{ __html: comment.content }} />
            {<Comment comments={comment.comments} />}
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
