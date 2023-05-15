import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import _ from 'lodash';
import './NewsItem.css';

export interface NewsI {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}
export interface NewsPropI {
  data: NewsI;
}

const NewsItem: React.FunctionComponent<NewsPropI> = (props) => {
  const params = { ..._.pick(props.data, ['url', 'title', 'user', 'time_ago']) };
  const navigate = useNavigate();
  const NewsClickHandler = () =>
    navigate({
      pathname: `/hackNews/${props.data.id}`,
      search: `?${createSearchParams(new URLSearchParams(params))}`,
    });

  return (
    <div onClick={NewsClickHandler} className="mt-1 mb-3 shadow item active-item rounded">
      <div className="container">
        <div className="d-flex justify-content-between">
          <span>{props.data.title}</span>
          <div className="d-flex w-50 justify-content-around">
            <span>public date: {props.data.time_ago}</span>
            <span>author: {props.data.user}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsItem;
