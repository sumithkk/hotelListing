import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import HotelHeader from './HotelHeader';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { getPropertyList, NextPage } from '../actions';
import { connect } from 'react-redux';
import Landmark from '../components/svgComponents/landmark';
import Location from '../components/svgComponents/location';

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1600px;
  width: 1600px;
  margin: 0 auto;
`;

const LandingPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  animation: slideUp 1s ease both;
  animation-delay: 0.3s;
  .currentLocation {
    // background: #fff;
    padding-top: 30px;
    margin-bottom: 30px;
    width: 100%;
    font-size: 1.5rem;
  }
  .landingItem {
    background: #fff;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    img {
      width: 500px;
    }
    .detailsWrap {
      font-size: 1.3rem;
      padding: 20px;
      width: 68%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h1 {
        margin: 0;
        font-size: 1.8rem;
      }
      .location {
        display: flex;
        align-items: center;
        svg {
          margin-right: 10px;
        }
      }
      .details {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
    }
  }
`;

const Card = styled.div`
  width: 20%;
  display: flex;
  margin: 32px;
  flex-direction: column;
  position: relative;
  border: 1px solid #dedede;
  background: #fff;
  animation: slideUp 1s ease both;
  animation-delay: 0.3s;
  .title {
    position: absolute;
    background: #00000061;
    width: 100%;
    padding: 5px;
    color: #fff;
  }
  h1 {
    margin: 0;
    font-size: 1rem;
    margin-bottom: 5px;
  }

  img {
    width: 100%;
  }
  .detailsWrap {
    font-size: 1rem;
    padding: 10px;
    .location {
      display: flex;
      svg {
        margin-right: 10px;
      }
    }
    .details {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .block {
        span {
          font-size: 0.9rem;
          color: #666666;
        }
      }
    }
  }
`;

const ViewBtn = styled.div`
  background: orange;
  padding: 6px 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HotelListing = (props) => {
  // Handling Searchbar
  const [loading, setLoading] = useState(true);
  const [landingItems, setLandingItems] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingResults, setGettingResults] = useState(false);
  const [showDrop, toggleDrop] = useState(false);
  const [selection, setSelection] = useState({});
  const [searchResults, setSearchResults] = useState('');

  const bottomBoundaryRef = useRef(null);

  const renderHotels = () => {
    return props.hotelInfo.hotels.map((hotel, i) => (
      <Card key={i}>
        <img src={hotel.thumbnailUrl} alt="hotel" />
        <div className="detailsWrap">
          <h1>{hotel.name}</h1>
          <div className="location">
            <Location width="30px" height="30px" />
            {hotel.address.extendedAddress}
          </div>
          {hotel.landmarks.length > 0 &&
            hotel.landmarks.slice(0, 1).map((l, i) => (
              <div className="location" key={i}>
                <Landmark width="30px" height="30px" />
                {l.distance} from {l.label}
              </div>
            ))}
          <div className="details">
            <div className="block">
              <span>Price</span>
              <div style={{ fontWeight: 'bold' }}>{hotel.ratePlan.price.current}</div>
            </div>
            <div className="block">
              <span>Rating</span>
              <div>{hotel.starRating}</div>
            </div>

            <ViewBtn>
              <a href={`/hotel-details/${hotel.id}`}>View</a>
            </ViewBtn>
          </div>
        </div>
      </Card>
    ));
  };

  // Component did mount
  useEffect(() => {
    console.log('Hotel mounted');
    window.localStorage.setItem('theme', 'light');
  }, []);

  useEffect(() => {
    props.getPropertyList(props.page);
  }, [props.page]);

  // infinite scrolling with intersection observer
  const useInfiniteScroll = (scrollRef, dispatch) => {
    const scrollObserver = useCallback(
      (node) => {
        new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (en.intersectionRatio > 0) {
              //   dispatch({ type: 'ADVANCE_PAGE' });
              props.NextPage();
            }
          });
        }).observe(node);
      },
      [dispatch]
    );

    useEffect(() => {
      if (scrollRef.current) {
        scrollObserver(scrollRef.current);
      }
    }, [scrollObserver, scrollRef]);
  };
  useInfiniteScroll(bottomBoundaryRef, props.page);

  console.log(props);
  return (
    <React.Fragment>
      {head()}
      {/* <HotelHeader /> */}
      <Content>
        {props.fetchingHotels && (
          <div className="loading">
            <svg
              id="icon-drone"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 510.604 510.604"
              width="512"
              height="512"
            >
              <g>
                <path d="M503.104,110.855h-63.066V94.099c0-4.142-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v16.755h-63.065   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h63.065v16.45c-14.424,3.4-25.195,16.37-25.195,31.817v7.569H203.777   c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h156.393l-7.811,30.002c-3.7,14.211-16.54,24.137-31.225,24.137h-35.836   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h18.27v23.457h-96.533v-23.457h48.263c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5   h-65.83c-14.685,0-27.525-9.925-31.225-24.137l-7.811-30.002h23.344c4.142,0,7.5-3.358,7.5-7.5c0-4.142-3.358-7.5-7.5-7.5h-63.017   v-7.569c0-15.447-10.771-28.417-25.195-31.817v-16.45h63.065c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H85.565V94.099   c0-4.142-3.358-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v16.755H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h63.065v16.45   c-14.424,3.4-25.195,16.37-25.195,31.817v30.138c0,18.028,14.667,32.695,32.695,32.695s32.695-14.667,32.695-32.695v-7.569h24.173   l8.794,33.781c4.336,16.654,17.245,29.281,33.247,33.67l-7.011,4.591c-23.068,15.107-37.688,39.525-40.11,66.994l-7.064,80.118   c-0.364,4.126,2.687,7.766,6.813,8.13c0.224,0.02,0.446,0.029,0.668,0.029c3.844,0,7.118-2.94,7.462-6.842l7.064-80.118   c2.016-22.863,14.185-43.188,33.386-55.762l13.854-9.072v24.577c0,4.142,3.358,7.5,7.5,7.5h48.267v16.449h-22.165   c-10.854,0-19.683,8.83-19.683,19.683v29.659c0,10.853,8.829,19.683,19.683,19.683h61.051c10.854,0,19.683-8.83,19.683-19.683   v-29.659c0-10.853-8.83-19.683-19.683-19.683h-23.886v-16.449h48.267c4.142,0,7.5-3.358,7.5-7.5V272.21l13.854,9.072   c19.201,12.574,31.37,32.899,33.386,55.762l7.064,80.118c0.344,3.902,3.618,6.842,7.462,6.842c0.221,0,0.444-0.01,0.667-0.029   c4.126-0.364,7.176-4.004,6.813-8.13l-7.064-80.118c-2.422-27.468-17.042-51.887-40.11-66.994l-7.011-4.591   c16.003-4.388,28.911-17.015,33.247-33.67l8.795-33.781h24.172v7.569c0,18.028,14.667,32.695,32.695,32.695   c18.028,0,32.695-14.667,32.695-32.695v-30.138c0-15.447-10.771-28.417-25.195-31.817v-16.45h63.066c4.142,0,7.5-3.358,7.5-7.5   S507.246,110.855,503.104,110.855z M95.761,204.26c0,9.757-7.938,17.695-17.695,17.695c-9.757,0-17.695-7.938-17.695-17.695   v-30.138c0-9.757,7.938-17.695,17.695-17.695c9.757,0,17.695,7.938,17.695,17.695V204.26z M291.371,340.418v29.659   c0,2.582-2.101,4.683-4.683,4.683h-61.051c-2.583,0-4.683-2.101-4.683-4.683v-29.659c0-2.582,2.1-4.683,4.683-4.683h61.051   C289.27,335.735,291.371,337.836,291.371,340.418z M450.233,174.122v30.138c0,9.757-7.938,17.695-17.695,17.695   c-9.757,0-17.695-7.938-17.695-17.695v-30.138c0-9.757,7.938-17.695,17.695-17.695   C442.296,156.427,450.233,164.365,450.233,174.122z" />
                <path d="M243.588,355.247c0,6.933,5.641,12.574,12.574,12.574c6.933,0,12.574-5.641,12.574-12.574s-5.641-12.574-12.574-12.574   C249.229,342.674,243.588,348.314,243.588,355.247z" />
              </g>
            </svg>
          </div>
        )}
        {renderHotels()}
      </Content>
      {!props.fetchingHotels && (
        <div
          id="page-bottom-boundary"
          style={{ border: '1px solid red' }}
          ref={bottomBoundaryRef}
        ></div>
      )}
    </React.Fragment>
  );
};

const head = () => {
  return (
    <Helmet key={Math.random()}>
      <title>{`hotel details`}</title>
      <meta property="og:title" content={`hotel details`} />
      <meta name="description" content={`Hotel details page`} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`/hotel-details/new`} />
    </Helmet>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchingHotels: state.hotel.fetchingHotels,
    hotelInfo: state.hotel.hotelList,
    page: state.hotel.page,
  };
};

const loadData = (store, param) => {
  return store.dispatch(getPropertyList(param));
};

HotelListing.propTypes = {
  hotelInfo: PropTypes.any,
  location: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  getPropertyList: PropTypes.func,
  NextPage: PropTypes.func,
  page: PropTypes.any,
};

HotelListing.defaultProps = {
  hotelInfo: {},
  location: null,
  match: null,
  getPropertyList: null,
  NextPage: null,
  page: null,
};

export default {
  component: connect(mapStateToProps, { getPropertyList, NextPage })(HotelListing),
  loadData,
};
