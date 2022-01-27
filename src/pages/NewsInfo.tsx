import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Comment, { CommentI, CommentPropI } from '../components/Comment/Comment';
import axios from '../utils/api';

const NewsInfo: React.FunctionComponent<{}> = () => {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newsId] = useState(Number(params.id));
  const [comments, setComments] = useState(Array<CommentI>());

  useEffect(() => {
    axios.get(`/item/${newsId}.json`).then((res) => {
      const typedComments: Array<CommentI> = res.data.comments.map((comment: any) => {
        return {
          comments: comment.comments,
          level: comment.level,
          commentsCount: comment.comments_count,
          content: comment.content,
          id: comment.id,
          time: comment.time,
          timeAgo: comment.time_ago,
          type: comment.type,
          url: comment.url,
          user: comment.user,
        };
      });

      setComments(typedComments);
    });
  }, [newsId]);

  return (
    <div className="d-flex flex-column container justify-content-center">
      <div className="align-self-center shadow w-100 text-center mt-1 mb-2">
        <h1>{searchParams.get('title')}</h1>
        <div className="d-flex w-100 justify-content-end pe-5">
          <h4>Автор: {searchParams.get('user')}</h4>
        </div>
      </div>
      <div className="shadow my-3 w-100 text-center">
        <h3>
          Cсылка на ресурс:
          <a href={String(searchParams.get('url'))}>{searchParams.get('url')} </a>
        </h3>
      </div>
      <div className=" d-flex flex-column justify-content-center shadow my-3 w-100">
        <div className="d-flex align-self-center">
          <h3>Обсуждения:</h3>
        </div>
        <div className="d-flex align-self-start mx-5">
          <Comment comments={comments}></Comment>
        </div>
      </div>
    </div>
  );
};

export default NewsInfo;
