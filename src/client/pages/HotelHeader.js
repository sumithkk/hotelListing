import React, { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import { DateRangeInput } from '@datepicker-react/styled';
import Search from '../components/search';
import { connect } from 'react-redux';
import { useLocalStorage } from '../../helpers/customHooks';
import Call from '../components/svgComponents/hotelIcons/Call';
import Chat from '../components/svgComponents/hotelIcons/Chat';
import FbLogo from '../components/svgComponents/hotelIcons/FbLogo';
import TweetLogo from '../components/svgComponents/hotelIcons/TweetLogo';
import InstaLogo from '../components/svgComponents/hotelIcons/InstaLogo';
import Sort from '../components/svgComponents/hotelIcons/Sort';
import User from '../components/svgComponents/hotelIcons/User';
import Bed from '../components/svgComponents/hotelIcons/Bed';
import Calender from '../components/svgComponents/hotelIcons/Calender';
import Info from '../components/svgComponents/hotelIcons/Info';

const AppHeader = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  background: #fff;
  z-index: 1;
  margin-bottom: 30px;
  position: fixed;
  top: 0;
  background: #fff;

  flex-direction: column;
  @media (max-width: 768px) {
    background: transparent;
    .brand {
      display: none;
    }
  }
`;

const HeaderTitle = styled.div`
  // position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 25px;
  }
  p {
    margin: 0;
    font-size: 2rem;
  }
`;

const Content = styled.div`
  flex-wrap: wrap;
  max-width: 1440px;
  width: 1440px;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  padding: 15px 0px 0px;
  position: relative;
  width: 100%;
  display: flex;
  margin: 0 auto;
  max-width: 1440px;
  align-items: center;
  justify-content: space-between;
  .brand {
    margin-right: 30px;
    font-size: 50px;
    line-height: 0.8;
    color: grey;
    text-decoration: none;
  }
  .search {
    position: relative;
    width: 35%;
    border: 2px solid #fff;
    border-bottom: 2px solid #f3f3f3;
    &.selected {
      transition: 1s all ease;
      border: 2px solid #f3f3f3;
      border-radius: 10px;
      input {
        border-radius: 10px;
        font-weight: 100;
      }
    }
    input {
      font-size: 1.3rem;
      border: 0;
      padding: 12px;
      padding-left: 45px;
      outline: none;
      width: -webkit-fill-available;
      color: #444;
      font-weight: 100;
    }

    svg {
      position: absolute;
      top: 12px;
      left: 10px;
      font-size: 1.5rem;
      fill: #444;
    }
  }
  .dropdown {
    position: absolute;
    z-index: 2;
    top: 43px;
    padding: 15px;
    background: #fff;
    left: 0;
    width: 95%;
    -webkit-box-shadow: -1px 2px 6px 0px rgba(102, 102, 102, 1);
    -moz-box-shadow: -1px 2px 6px 0px rgba(102, 102, 102, 1);
    box-shadow: -1px 2px 6px 0px rgba(102, 102, 102, 1);
    .resultGroup {
      padding: 10px;
      background: #f3f3f3;
    }
    .result {
      padding: 10px;
      margin-left: 20px;
      &:hover {
        cursor: pointer;
        background: #f2f2f2;
      }
    }
  }
  @media (max-width: 768px) {
    // border: 1px solid #f3f3f3;
    background: #fff;
    border-radius: 10px;
    width: 100%;
    margin: 10px;
    padding: 0;
    flex-wrap: wrap;
    .search {
      width: 100%;
      border: none;
      border-radius: 0;
    }
    div[data-testid='DateRangeInputGrid'] {
      grid-template-columns: 180px 44px 180px;
      border-bottom: 1px solid #f3f3f3;
      label {
        border: 0;
      }
    }
  }
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

const FilterButton = styled.div`
  cursor: pointer;
  padding: 15px;
  background: #fff;
  font-size: 1.1rem;
  margin-left: 10px;
`;

const Loader = styled.div`
  display: inline-block;
  height: 37px;
  width: 15px;
  position: absolute;
  left: 22px;
  top: 18px;
  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fbae17;
    transform-origin: 50%;
    animation: bounce 500ms alternate infinite ease;
  }
`;

const DateWrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #f8e4e5;
  border-radius: 10px;
  position: relative;
  padding-left: 60px;
  div[data-testid='DateRangeInputGrid'] {
    grid-template-columns: 115px 39px 115px;
    label {
      border-radius: 10px;
      border: none;
      svg {
        display: none;
      }
      input {
        border-radius: 10px;
        padding: 0 15px;
      }
    }
    & + div {
      left: -60px;
    }
  }
  @media (max-width: 768px) {
    margin: 0;
  }
  label,
  input {
    border-radius: 10px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    font-weight: normal;
    height: 46px;
  }
  label {
    border: 1px solid #f3f3f3;
  }
  input {
    padding: 0 50px;
    color: #444;
  }
  svg {
    width: 20px;
    height: 20px;
  }
  button {
    outline: none;
  }
`;

const InputBox = styled.div`
  position: relative;
  border: 1px solid #f8e4e5;
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    border: none;
    padding: 14px;
    padding-left: 60px;
    width: 65px;
    border-radius: 10px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    outline: none;
    color: #444;
  }
  @media (max-width: 768px) {
    border: none;
  }
`;

const CTA = styled.button`
  background: #d84e51;
  border-radius: 5px;
  padding: 15px;
  color: #fff;
  border: none;
  margin-left: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  @media (max-width: 768px) {
    position: absolute;
    bottom: -25px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
`;

const BottomHeader = styled.div`
  display: flex;
  padding: 15px 0;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  .icon {
    background: #f8e4e5;
    fill: #e0504f;
    padding: 14px;
    border: 3px solid #fff;
    border-radius: 10px;
    font-size: 1.2rem;
    position: absolute;
    left: -3px;
    z-index: 2;
  }
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25%;
  .title {
    border: 2px solid #f3f3f3;
    border-right: 2px solid #fff;
    padding: 15px;
    border-top-left-radius: 30px;
    color: #444;
  }
  svg {
    cursor: pointer;
    border-radius: 10px;
    padding: 8px;
    font-size: 1.5rem;
    fill: #e0504f;
  }
  .fb {
    fill: #2d88ff;
    // border: 1.5px solid #2d88ff;
    // transition: .2s all ease;
    &:hover {
      background: #2d88ff;
      fill: #fff;
    }
  }
  .insta {
    fill: #ba00b4;
    // border: 1.5px solid #FD0000;
    // transition: .2s all ease-in-out;
    &:hover {
      background-image: linear-gradient(45deg, #fd0000, #ba00b4);
      fill: #fff;
    }
  }
  .twitter {
    fill: rgba(29, 161, 242, 1);
    // border: 1.5px solid rgba(29,161,242,1.00);
    // transition: .2s all ease;
    &:hover {
      background: rgba(29, 161, 242, 1);
      fill: #fff;
    }
  }
`;

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload };
    case 'dateChange':
      return action.payload;
    default:
      throw new Error();
  }
}

const HotelHeader = (props) => {
  // Handling Searchbar
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState({});
  const [searchResults, setSearchResults] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [adult, setAdult] = useState(1);
  const [sort, setSort] = useState('Price');

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

  const setCalender = (data) => {
    setDate(data);
  };

  const handleDatesChange = (data) => {
    if (!data.focusedInput) {
      setDate({ ...data, focusedInput: START_DATE });
    } else {
      setDate(data);
    }
  };

  const handleSearch = () => {
    window.location.pathname = `/hotels/${selection.destinationId}/${`PRICE`}/${
      state.startDate !== null ? formatDate(state.startDate) : formatDate(new Date())
    }/${state.endDate !== null ? formatDate(state.endDate) : ''}/${adult}/${props.page + 1}/`;
  };
  console.log(state.startDate);
  // if (!props) return <div />;
  return (
    <React.Fragment>
      <AppHeader className="hotelHeader">
        <SearchBar className="searchBar">
          <Search />
          <Contact>
            <div className="title">Contact us :</div>
            <Call />
            <Chat />
            <Info />
          </Contact>
          <Contact>
            <div className="title">Follow us on :</div>
            <FbLogo className="fb" />
            <TweetLogo className="twitter" />
            <InstaLogo className="insta" />
          </Contact>
        </SearchBar>
        <BottomHeader>
          <div>Filter your search : </div>
          <DateWrap>
            <Calender className="icon" />
            <DateRangeInput
              onDatesChange={(data) => dispatch({ type: 'dateChange', payload: data })}
              onFocusChange={(focusedInput) =>
                dispatch({ type: 'focusChange', payload: focusedInput })
              }
              startDate={state.startDate} // Date or null
              endDate={state.endDate} // Date or null
              focusedInput={state.focusedInput} // START_DATE, END_DATE or null
            />
          </DateWrap>
          <InputBox>
            <Bed className="icon" />
            <label>
              <input type="text" value={`Room - ${adult}`} name="bed" onChange={() => setAdult()} />
            </label>
          </InputBox>
          <InputBox>
            <User className="icon" />
            <label>
              <input
                type="text"
                value={`Adult - ${adult}`}
                name="adult"
                onChange={() => setAdult()}
              />
            </label>
          </InputBox>
          <InputBox>
            <User className="icon" />
            <label>
              <input
                type="text"
                value={`Children - ${adult}`}
                name="children"
                style={{ width: '80px' }}
                onChange={() => setAdult()}
              />
            </label>
          </InputBox>
          <InputBox>
            <Sort className="icon" />
            <label>
              <input type="text" value={sort} name="sort" onChange={() => setAdult()} />
            </label>
          </InputBox>
          <CTA type="button" name="search" onClick={() => handleSearch()}>
            Find Hotel
          </CTA>
        </BottomHeader>
      </AppHeader>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.hotel.headerData,
    page: state.hotel.page,
  };
};

// export default {
//   component: connect(mapStateToProps)(HotelHeader),
// };

export default connect(mapStateToProps)(HotelHeader);

// const MemoHotelHeader = React.memo(HotelHeader);
// export default connect(mapStateToProps)(MemoHotelHeader);
