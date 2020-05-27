/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import ArticleDetailModal from '../components/ArticleDetailModal';
import { getPropertyList } from '../actions';
import css from './work.css';
import styled from 'styled-components';

import HotelHeader from './HotelHeader';

const Header = styled.div`
  height: 50px;
  width: 100%;
  background: orange;
`;

const List = styled.div`
  border: 1px solid #dedede;
  margin: 20px;
`;

const ArticleListPage = (props) => {
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  const readArticle = (article) => {
    setCurrentArticle(article);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderArticles = () => {
    return props.articles.map((res) => (
      <List key={res.location_id} className="resList">
        <div>{res.photo && <img src={res.photo.images.medium.url} />}</div>
        <div>{res.name}</div>
        <div>{res.location_string}</div>
        <div>{res.rating}</div>
        <div>{res.address}</div>
        {/* <div>
          Cuisine : {res.cuisine.length !== 0 && res.cuisine.map((c) => <div>{c.name}</div>)}
        </div> */}
        {/* <div>
    Reviews: {res.reviews.length !== 0 && res.reviews.map((r) => <div>{r.title} - {r.rating} - {}</div>)}
        </div> */}
        <div>{res.ranking}</div>
        <div>{res.name}</div>
      </List>
    ));
  };

  const { articles, location, match } = props;

  // const category = props && articles[0] && articles[0].source.name;

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>{`Articles`}</title>
        <meta property="og:title" content={`Articles List`} />
        <meta
          name="description"
          content={`Latest articles, popular articles from most popular news websites of the world`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://react-ssr-ilker.herokuapp.com${location.pathname}`} />
      </Helmet>
    );
  };

  const { getPropertyList: loadArticles } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      loadArticles(match.params.id);
    } else {
      loadArticles();
    }
  }, [loadArticles, match.params.id]);

  return (
    <div>
      {head()}
      {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
      <HotelHeader />
      <div className="row">
        content
        <div className="section">
          <div className="row">{renderArticles()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const loadData = (store, param) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(getPropertyList(param)); // Manually dispatch a network request
};

ArticleListPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  getPropertyList: PropTypes.func,
};

ArticleListPage.defaultProps = {
  articles: [],
  location: null,
  match: null,
  getPropertyList: null,
};

export default {
  component: connect(mapStateToProps, { getPropertyList })(ArticleListPage),
  loadData,
};
