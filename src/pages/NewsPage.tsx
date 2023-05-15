import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import NewsItem, { NewsI } from '../components/NewsItem/NewsItem';
import UseMessages from '../hooks/UseMessages';
import axios from '../utils/api';
import moment from 'moment';

import { useStore } from 'react-redux';
import { createSetLastUpdateTimestampAction } from '../.store/actionCreators/lastUpdateTimestampActionCreator';

const NewsPage: React.FunctionComponent<{}> = () => {
  const store = useStore();
  const [news, setNews] = useState(Array<NewsI>());
  const message = UseMessages();
  const getNews = async () => {
    let updatedNews: Array<NewsI> = [];
    for (let i = 1; i <= 5; i++) {
      const data = (await axios.get(`/news/${i}.json`)).data;
      updatedNews = _.concat<NewsI>(
        updatedNews,
        data.map((el: Object) => {
          return new Object(el) as NewsI;
        }),
      );
    }
    setNews(
      updatedNews.sort((a, b) => {
        return b.time - a.time;
      }),
    );
    store.dispatch(createSetLastUpdateTimestampAction(moment().unix().toString()));
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const lastUpdate = store.getState().lastUpdateTimestampReducer.lastUpdateTimestamp;
      if (lastUpdate.length && moment().unix() - Number(lastUpdate) >= 15) {
        await getNews();
      } else if (!lastUpdate.length) {
        await getNews();
      }
    }, 200);
    return () => {
      clearInterval(interval);
      store.dispatch(createSetLastUpdateTimestampAction(''));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await getNews();
      message('Updated');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center container">
      <div className="w-100 d-flex justify-content-between shadow mt-2 mb-2 rounded">
        <h1 className="ms-5">Hacker News</h1>
        <div className="btn btn-primary align-self-center me-5" onClick={updateHandler}>
          Обновить
        </div>
      </div>
      <div className="top-0 w-100 d-flex flex-column mt-2 mb-2">
        {news.map((data, idx) => (
          <NewsItem data={data} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
