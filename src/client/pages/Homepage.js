/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import ArticleDetailModal from '../components/ArticleDetailModal';
import { getPropertyList } from '../actions';
import styled from 'styled-components';

import Ahmedabad from '../components/svgComponents/Ahmedabad';
import Bangalore from '../components/svgComponents/Bangalore';
import Chennai from '../components/svgComponents/Chennai';
import Delhi from '../components/svgComponents/Delhi';
import Gujarat from '../components/svgComponents/Gujarat';
import Hyderabad from '../components/svgComponents/Hyderabad';
import Lucknow from '../components/svgComponents/Lucknow';
import Mumbai from '../components/svgComponents/Mumbai';
import Rajastan from '../components/svgComponents/Rajastan';
import Kolkata from '../components/svgComponents/Kolkata';
import BannerBg from '../components/svgComponents/BannerBg';

const Header = styled.div`
  height: 50px;
  width: 100%;
  background: orange;
`;

const List = styled.div`
  border: 1px solid #dedede;
  margin: 20px;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-direction: column;
  line-height: 2;
  padding-top: 100px;
  background: #c0e3f3;
  .leftTree {
    transform: translate(0%, 40%);
    opacity: 0.5;
    path,
    ellipse {
      transform: scale(0.6);
    }
  }
  .rightTree {
    transform: translate(59%, 40%);
    opacity: 0.5;
    path,
    ellipse {
      transform: scale(0.6);
    }
  }
  @media (max-width: 768px) {
    .bannerBg {
      width: 100% !important;
      padding-top: 180px;
    }
  }
`;

const BannerTxt = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: grey;
  div:first-child {
    color: #ea4c89;
    font-weight: 100;
    font-size: 3.5rem;
  }
  @media (max-width: 768px) {
    div:first-child {
      font-weight: 100;
      font-size: 1rem;
    }
  }
`;

const CityWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  padding: 30px;
  background: #fff;
  a {
    text-decoration: none;
    color: #666;
  }
  svg {
    transition: 1s all ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
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
        <title>{`Hotels`}</title>
        <meta property="og:title" content={`Search for hotels`} />
        <meta name="description" content={`Search for hotels around the world`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://hotelsapp.herokuapp.com${location.pathname}`} />
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
  console.log(match);
  return (
    <div>
      {head()}
      {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
      <div className="row">
        <Banner>
          <BannerBg className="bannerBg" width="129vh" />
          <BannerTxt>
            <div>Search for Hotels around the world!</div>
            <div>Choose Your City.</div>
          </BannerTxt>
        </Banner>
        <CityWrap>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Ahmedabad height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Bangalore height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Chennai height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Delhi height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Gujarat height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Hyderabad height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Lucknow height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Mumbai height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Rajastan height="170px" />
          </a>
          <a href="/hotels/undefined/PRICE/2020-06-04/2020-07-02/1/1/">
            <Kolkata height="170px" />
          </a>
        </CityWrap>
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
