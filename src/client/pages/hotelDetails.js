import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import HotelHeader from './HotelHeader';
import { getHotelDetails, getHotelPhotos } from '../actions';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import HotelPhotosData from '../../stubs/hotels/hotel-photos.json';
import Locaton from '../components/svgComponents/location';
import CircleGraph from '../components/circleGraph';
import Rating from '../components/starRating';
import Land from '../components/svgComponents/land';
import DoubleBed from '../components/svgComponents/doubleBed';
import QueenBed from '../components/svgComponents/queenBed';

const Carousel = styled.div`
position: relative;
width: 98%;
border-radius: 10px;
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
    // background: #00000082;
    color: #fff;
}
.leftArrow {
    left:0;
    // background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,255,85,0) 100%);}
.rightArrow {
    right:0;
    // background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6979166666666667) 60%, rgba(0,0,0,1) 100%);
}
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1600px;
  width: 1600px;
  margin: 90px auto 0 auto;
  font-weight: 400;

  .rightSection {
    background: #f2f2f2;
    border-radius: 10px;
    padding: 20px;
    padding-top: 0;
    h1 {
      font-size: 1.4rem;
    }
  }
  ul {
    list-style-type: circle;
    padding-left: 20px;
    li {
      line-height: 2;
      color: #666;
    }
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  &.feature {
    padding-bottom: 50px;
    flex-wrap: wrap;
    font-size: 1rem;
    justify-content: start;
  }
`;

const Divider = styled.div`
  .divider {
    position: relative;
    height: 1px;
  }
  .div-transparent:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 5%;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, transparent, #ea4c89, transparent);
  }
  .div-dot:after {
    content: '';
    position: absolute;
    z-index: 1;
    top: -9px;
    left: calc(50% - 9px);
    width: 18px;
    height: 18px;
    background-color: #ea4c89;
    border: 1px solid #ea4c89;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px white, 0 0 0 4px white;
  }
`;

const Details = styled.div`
  width: 100%;
  background: #fff;
  padding: 15px 0;
  .ratingSection {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-right: 20px;
  }
  &.arrivalInfo {
    display: flex;
    margin-right: 20px;
    border-radius: 10px;
    justify-content: space-around;
    border: 1px solid #f7aeb2;
    div {
      margin-right: 20px;
      &:last-child {
        margin: 0;
      }
    }
  }
  &.description {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    b {
      font-weight: normal;
    }
    .map {
      margin-right: 20px;
      border-radius: 10px;
      border: 1px solid #dedede;
      min-width: 35%;
      min-height: 250px;
    }
  }
  &.instruction {
    p {
      font-size: 1rem;
    }
  }
  &.transport {
    h2 {
      text-transform: capitalize;
    }
    div {
      font-size: 1rem;
    }
  }
  .roomTypes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 20px;
  }
  .whatsAround {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .item {
      color: #666;
      margin: 0 20px;
      min-width: 28%;
      line-height: 2.5;
      svg {
        margin-right: 10px;
      }
    }
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 148px;
  margin: 10px 0;
  .feature-icon {
    background: #f8e4e5;
    background-image: url('./icons/location.svg');
    border-radius: 50px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .feature-txt {
    text-align: center;
    font-weight: 100;
    margin-top: 10px;
    font-size: 0.9rem;
  }
`;

const FeatureIcon = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50px;
  background: #dedede url(${Locaton});
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
    getPropertyImages();
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

  const getPropertyImages = async (props) => {
    // var unirest = require('unirest');
    // var req = unirest('GET', 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos');
    // req.query({
    //   id: '782617888',
    // });
    // req.headers({
    //   'x-rapidapi-host': 'hotels4.p.rapidapi.com',
    //   'x-rapidapi-key': '4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8',
    //   useQueryString: true,
    // });
    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);
    //   let imageArray = stackImages(res.body.hotelImages);
    //   setImages(imageArray);
    // });
    const getHotelData = () =>
      new Promise((resolve) =>
        setTimeout(() => {
          // let formatedData = formatHotelData(HotelListData.data);
          // console.log(formatedData);
          resolve(HotelPhotosData);
        }, 1000)
      );
    let res = await getHotelData();
    let imageArray = stackImages(res.hotelImages);
    setImages(imageArray);
  };
  return (
    <Carousel>
      <div className="leftArrow" onClick={() => handleScroll('left')}>
        Left
      </div>
      <div className="carouselInner" ref={carouselRef}>
        {images !== '' &&
          images.big.map((img, i) => (
            // <div key={i} className="slide">
            <img key={i} style={{ maxWidth: '90%' }} src={img} alt="hotel" />
            // </div>
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

  let data = props.hotelDetails;
  return (
    <div className="pageContainer">
      {head()}
      <Content>
        <div className="LeftSection" style={{ width: '75%' }}>
          <Section style={{ flexDirection: 'column' }}>
            <Slider />
            <Details style={{ display: 'flex' }}>
              <div className="hotelDesc" style={{ width: '80%' }}>
                <h1 style={{ marginTop: 0 }}>
                  {data !== '' && data.data.body.propertyDescription.name}
                </h1>
                <p style={{ marginTop: '0', color: '#808080' }}>
                  {data !== '' && data.data.body.propertyDescription.address.fullAddress}
                </p>
                <h2>{/* {data !== "" && data.data.body.propertyDescription.starRating} */}</h2>
              </div>
              <div className="ratingSection">
                {data !== '' && (
                  <Rating totalStars="5" selected={data.data.body.propertyDescription.starRating} />
                )}
              </div>
            </Details>
          </Section>
          <Section className="feature">
            {data !== '' &&
              data.data.body.overview.overviewSections
                .filter((o) => o.type == 'HOTEL_FEATURE')
                .map((overview) =>
                  overview.content.map((ov, i) => (
                    <Feature name={ov} key={i}>
                      {/* <FeatureIcon>{''}</FeatureIcon> */}
                      <div className="feature-icon">
                        <Locaton width="30px" fill="red" />
                      </div>
                      <div className="feature-txt">{ov}</div>
                      {/* <IconText>{ov}</IconText> */}
                    </Feature>
                  ))
                )}
          </Section>
          <Section>
            <Details style={{ padding: 0 }} className="description">
              <div>
                <h2 style={{ margin: '0' }}>Description</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data !== '' && data.data.body.propertyDescription.tagline[0],
                  }}
                />
              </div>
              {data !== '' && (
                <div
                  className="map"
                  // src={data.data.body.propertyDescription.mapWidget.staticMapUrl}
                  style={{
                    background:
                      'url(https://maps-api-ssl.google.com/maps/api/staticmap?center=12.777348,77.77562&format=jpg&sensor=false&key=AIzaSyDaDqDNrxWrxcURixO2l6TbtV68X0Klf4U&zoom=16&size=834x443&scale&signature&signature=Q7XFwW15xrzuit2NgcOaX-8rGk4=)',
                  }}
                ></div>
              )}
            </Details>
          </Section>
          <Section>
            <Details className="arrivalInfo">
              {data !== '' &&
                data.data.body.atAGlance.keyFacts.arrivingLeaving.map((al, i) => (
                  <div key={i}>{al}</div>
                ))}
              {/* {data !== '' && (
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
            )} */}
              {/* {data !== '' &&
                data.data.body.propertyDescription.freebies.map((f, i) => <div key={i}>{f}</div>)} */}
            </Details>
          </Section>

          <Section className="instructions">
            {data !== '' &&
              data.data.body.atAGlance.keyFacts.specialCheckInInstructions.length > 0 && (
                <Details className="instruction">
                  <h2>Special Instruction</h2>
                  {data !== '' &&
                    data.data.body.atAGlance.keyFacts.specialCheckInInstructions.map((al, i) => (
                      <p key={i}>{al}</p>
                    ))}
                </Details>
              )}

            {data !== '' && data.data.body.atAGlance.keyFacts.hotelSize.length > 0 && (
              <Details className="instruction">
                <h2>Hotel Size</h2>
                {data !== '' &&
                  data.data.body.atAGlance.keyFacts.hotelSize.map((al, i) => <p key={i}>{al}</p>)}
              </Details>
            )}

            {data !== '' && data.data.body.atAGlance.keyFacts.requiredAtCheckIn.length > 0 && (
              <Details className="instruction">
                <h2>Required at Check-In</h2>
                {data !== '' &&
                  data.data.body.atAGlance.keyFacts.requiredAtCheckIn.map((al, i) => (
                    <p key={i}>{al}</p>
                  ))}
              </Details>
            )}
          </Section>
          <Divider>
            <div className="divider div-transparent div-dot"></div>
          </Divider>
          <Section>
            <Details>
              {/* <h2>Room Types</h2> */}
              <div className="roomTypes">
                {data !== '' &&
                  data.data.body.propertyDescription.roomTypeNames.map((rt, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <DoubleBed width="45px" height="45px" />
                      <div>{rt}</div>
                    </div>
                  ))}
              </div>
            </Details>
          </Section>
          <Divider>
            <div className="divider div-transparent div-dot"></div>
          </Divider>
          <Section>
            <Details>
              <h2>What’s Around</h2>
              <div className="whatsAround">
                {data !== '' &&
                  data.data.body.overview.overviewSections
                    .filter((o) => o.type == 'LOCATION_SECTION')
                    .map((overview) =>
                      overview.content.map((ov, i) => (
                        <div className="item" key={i}>
                          <Land width="18px" height="18px" /> {ov}
                        </div>
                      ))
                    )}
              </div>
            </Details>
          </Section>
          <Divider>
            <div className="divider div-transparent div-dot"></div>
          </Divider>
          <Section>
            <Details>
              <h2>Freebies</h2>
              <ul>
                {data !== '' &&
                  data.data.body.overview.overviewSections
                    .filter((o) => o.type == 'HOTEL_FREEBIES')
                    .map((overview) => overview.content.map((ov, i) => <li key={i}>{ov}</li>))}
              </ul>
            </Details>
          </Section>
          <Divider>
            <div className="divider div-transparent div-dot"></div>
          </Divider>
          <Section className="transportation">
            {data !== '' &&
              data.transportation.transportLocations.map((tl, i) => (
                <Details key={i}>
                  <div className="transport">
                    <h2>{tl.category}</h2>
                    <ul>
                      {tl.locations.map((l, i) => (
                        <li key={i}>
                          {l.name} {l.distanceInTime}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Details>
              ))}
          </Section>
        </div>
        <div className="rightSection" style={{ width: '22.5%' }}>
          <h1>Guest Reviews</h1>
          <div
            style={{
              background: '#fff',
              padding: '15px',
              minHeight: '200px',
              borderRadius: '10px',
            }}
          >
            <div>
              {data !== '' &&
                data.data.body.guestReviews.trustYouReviews.map((r, i) => (
                  <CircleGraph
                    box="50"
                    percentage="50"
                    className={r.categoryName}
                    title={r.categoryName}
                    subtitle={r.text}
                    key={i}
                  />
                ))}
            </div>
          </div>
          <h1>Ratings</h1>
          <div
            style={{
              background: '#fff',
              padding: '15px',
              minHeight: '200px',
              borderRadius: '10px',
            }}
          >
            Ratings here
          </div>
          <h1>At a Glance</h1>
          <div
            style={{
              background: '#fff',
              padding: '15px',
              minHeight: '200px',
              borderRadius: '10px',
            }}
          >
            Ratings here
          </div>
        </div>
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
