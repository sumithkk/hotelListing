import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import HotelHeader from './HotelHeader';
import { getHotelDetails, getHotelPhotos } from '../actions';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

const Carousel = styled.div`
position: relative
width: 50%;
height: 500px;
overflow: hidden;
display: flex;
.carouselInner {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow-y:hidden;
    overflow-x: scroll;
    background: #fff
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { width: 0 !important }
}
.leftArrow, .rightArrow {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100px;
    background: #00000082;
    color: #fff;
}
.leftArrow {
    left:0;
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,255,85,0) 100%);}
.rightArrow {
    right:0;
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6979166666666667) 60%, rgba(0,0,0,1) 100%);
}
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1600px;
  width: 1600px;
  margin: 0 auto;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
`;

const Details = styled.div`
  width: 50%;
  background: #fff;
  padding: 15px;
`;

const Slider = () => {
  const [images, setImages] = useState('');
  const carouselRef = useRef(null);
  const stackImages = (images) => {
    //do something
    let stackedImages = {
      small: [],
      big: [],
    };
    images.forEach((img) => {
      let baseurl = img.baseUrl;
      let small = baseurl.replace(/ *\{[^)]*\} */g, 'y');
      let big = baseurl.replace(/ *\{[^)]*\} */g, 'w');
      stackedImages.small.push(small);
      stackedImages.big.push(big);
    });
    return stackedImages;
  };

  useEffect(() => {
    // getPropertyImages();
    // props.getHotelPhotos();
  }, []);

  const handleScroll = (pos) => {
    const elm = carouselRef.current;
    const scrollWidth = elm.offsetWidth;
    console.log(elm.style);
    if (pos === 'left') {
      carouselRef.current.style.transform = `translateX(${scrollWidth}px)`;
    } else {
      carouselRef.current.style.transform = `translateX(-${scrollWidth}px)`;
    }
  };

  // const getPropertyImages = (props) => {
  //   // var unirest = require('unirest');
  //   // var req = unirest('GET', 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos');
  //   // req.query({
  //   //   id: '782617888',
  //   // });
  //   // req.headers({
  //   //   'x-rapidapi-host': 'hotels4.p.rapidapi.com',
  //   //   'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
  //   //   useQueryString: true,
  //   // });
  //   // req.end(function (res) {
  //   //   if (res.error) throw new Error(res.error);
  //   //   let imageArray = stackImages(res.body.hotelImages);
  //   //   setImages(imageArray);
  //   // });
  //   props.getHotelPhotos();
  // };
  console.log(images);
  return (
    <Carousel>
      <div className="leftArrow" onClick={() => handleScroll('left')}>
        Left
      </div>
      <div className="carouselInner" ref={carouselRef}>
        {images !== '' &&
          images.big.map((img) => (
            <div className="slide">
              <img style={{ maxWidth: '90%' }} src={img} alt="hotel" />
            </div>
          ))}
      </div>
      <div className="rightArrow" onClick={() => handleScroll('right')}>
        Right
      </div>
    </Carousel>
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

const HotelDetail = (props) => {
  // Handling Searchbar
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingResults, setGettingResults] = useState(false);
  const [showDrop, toggleDrop] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  // Component did mount
  useEffect(() => {
    console.log('Hotel mounted');
    window.localStorage.setItem('theme', 'light');
  }, []);

  console.log('==== Hotel Details ====');
  // console.log(data);
  //   console.log("==== Hotel Images ====");
  //   console.log(images);
  let data = props.hotelDetails;
  return (
    <div className="pageContainer">
      {head()}
      {/* <HotelHeader /> */}
      <Content>
        {/* {loading && (
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
        )} */}
        <Section>
          {/* <Slider /> */}
          <Details>
            <div className="hotelDesc">
              <h1>{data !== '' && data.data.body.propertyDescription.name}</h1>
              <h2>
                {/* {data !== "" && data.data.body.propertyDescription.starRating} */}
                {data !== '' && data.data.body.propertyDescription.starRatingTitle}
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: data !== '' && data.data.body.propertyDescription.tagline[0],
                }}
              />

              <p>{data !== '' && data.data.body.propertyDescription.address.fullAddress}</p>
            </div>
            {data !== '' &&
              data.data.body.atAGlance.keyFacts.arrivingLeaving.map((al) => <div>{al}</div>)}
            {data !== '' && (
              <React.Fragment>
                <div>{data.data.body.propertyDescription.featuredPrice.beforePriceText}</div>
                <div>
                  {data.data.body.propertyDescription.featuredPrice.currentPrice.formatted}
                  {data.data.body.propertyDescription.featuredPrice.afterPriceText}
                  {data.data.body.propertyDescription.featuredPrice.oldPrice}
                  {data.data.body.propertyDescription.featuredPrice.pricingAvailability}
                  {data.data.body.propertyDescription.featuredPrice.pricingTooltip}
                </div>
              </React.Fragment>
            )}
            {data !== '' && data.data.body.propertyDescription.freebies.map((f) => <div>{f}</div>)}
          </Details>
        </Section>
        <Section className="instructions">
          <Details className="instruction">
            <h2>Special Instruction</h2>
            {data !== '' &&
              data.data.body.atAGlance.keyFacts.specialCheckInInstructions.map((al) => (
                <div>{al}</div>
              ))}
          </Details>
          <Details className="instruction">
            <h2>Hotel Size</h2>
            {data !== '' &&
              data.data.body.atAGlance.keyFacts.hotelSize.map((al) => <div>{al}</div>)}
          </Details>
          <Details>
            <h2>Required at Check-In</h2>
            {data !== '' &&
              data.data.body.atAGlance.keyFacts.requiredAtCheckIn.map((al) => <div>{al}</div>)}
          </Details>
        </Section>
        <Section>
          <Details>
            <h2>Features</h2>
            <ul>
              {data !== '' &&
                data.data.body.overview.overviewSections.map((overview) =>
                  overview.content.map((ov) => <li>{ov}</li>)
                )}
            </ul>
          </Details>
          <Details>
            <h2>Map Location</h2>
            {data !== '' && (
              <div>
                <img
                  style={{ maxWidth: '100%' }}
                  src={data.data.body.propertyDescription.mapWidget.staticMapUrl}
                />
              </div>
            )}
          </Details>
        </Section>
        <Section>
          {data !== '' &&
            data.transportation.transportLocations.map((tl) => (
              <Details>
                <div className="transport">
                  <h2>{tl.category}</h2>
                  {tl.locations.map((l) => (
                    <div>
                      {l.name} {l.distanceInTime}
                    </div>
                  ))}
                </div>
              </Details>
            ))}
        </Section>
      </Content>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchingHotels: state.hotel.fetchingHotels,
    hotelDetails: state.hotel.hotelDetails,
  };
};

const loadData = (store, param) => {
  return store.dispatch(getHotelDetails(param));
};

export default {
  component: connect(mapStateToProps, { getHotelDetails, getHotelPhotos })(HotelDetail),
  loadData,
};
