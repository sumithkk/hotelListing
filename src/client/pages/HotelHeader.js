import React, { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import Sort from './icons/sort.svg';
// import Filter from './icons/filter.svg';
import User from '../components/svgComponents/user';
import { DateRangeInput } from '@datepicker-react/styled';
import Search from '../components/search';
import { connect } from 'react-redux';
import { useLocalStorage } from '../../helpers/customHooks';
import Banner from '../images/banner.jpg';
import Filter from '../components/svgComponents/filter';

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
  @media (max-width: 768px) {
    background: transparent;
    .brand {
      display: none;
    }
  }

  &.homepage {
    background: url(https://pix10.agoda.net/hotelImages/101/1015998/1015998_15120409390038243686.jpg?s=1024x768)
      no-repeat;
    height: 500px;
    background-position: center;
    .searchBar {
      position: absolute;
      bottom: -47px;
      margin: 0 auto;
      width: 70%;
      left: 0;
      right: 0;
      border-radius: 10px;
      background: #fff;
      padding: 20px;
      -webkit-box-shadow: 0px 1px 5px 0px rgba(102, 102, 102, 1);
      -moz-box-shadow: 0px 1px 5px 0px rgba(102, 102, 102, 1);
      box-shadow: 0px 1px 5px 0px rgba(102, 102, 102, 1);
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
  max-width: 1600px;
  width: 1600px;
  margin: 0 auto;
`;

const BottomHeader = styled.div`
  background: grey;
`;

const SearchBar = styled.div`
  padding: 15px 10px 15px;
  position: relative;
  width: 100%;
  display: flex;
  margin: 0 auto;
  max-width: 1600px;
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
    border: 1px solid #fff;
    border-bottom: 1px solid #dedede;
    &.selected {
      border: 1px solid #dedede;
      border-radius: 5px;
      input {
        border-radius: 5px;
      }
    }
    input {
      font-size: 1rem;
      border: 0;
      padding: 12px;
      padding-left: 45px;
      outline: none;
      width: -webkit-fill-available;
      color: #666;
    }

    svg {
      transition: 1s all ease;
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
  .dropdown {
    position: absolute;
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
      background: #dedede;
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
    // border: 1px solid #dedede;
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
      border-bottom: 1px solid #dedede;
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
  margin-left: 30px;
  @media (max-width: 768px) {
    margin: 0;
  }
  label,
  input {
    border-radius: 5px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    font-weight: normal;
    height: 48px;
  }
  label {
    border: 1px solid #dedede;
  }
  input {
    padding: 0 50px;
    color: #666;
  }
  svg {
    width: 20px;
    height: 20px;
    margin-top: -3px;
  }
  button {
    outline: none;
  }
`;

const Adult = styled.div`
  position: relative;
  margin-left: 25px;
  border: 1px solid #dedede;
  background: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: rgb(188, 190, 192);
    margin-left: 10px;
    width: 20px;
    height: 20px;
  }
  input {
    border: none;
    padding: 15px;
    width: 60px;
    border-radius: 5px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    outline: none;
    color: #666;
  }
  @media (max-width: 768px) {
    border: none;
  }
`;

const CTA = styled.button`
  background: #ea4c89;
  border-radius: 5px;
  padding: 15px;
  color: #fff;
  border: none;
  margin-left: 20px;
  width: 100px;
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
    <AppHeader className="hotelHeader" style={{ width: '100%' }}>
      <SearchBar className="searchBar">
        <a href="/" className="brand">
          HoTEL
        </a>
        <Search />
        <DateWrap>
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
        <Adult>
          <User />
          <input
            type="number"
            style={{ width: '35px' }}
            value={adult}
            name="adult"
            onChange={() => setAdult()}
          />
        </Adult>
        <Adult>
          <Filter />
          <input type="text" value={sort} name="sort" onChange={() => setAdult()} />
        </Adult>
        <CTA type="button" name="search" onClick={() => handleSearch()}>
          SEARCH
        </CTA>
        {searchResults !== '' && (
          <React.Fragment>
            <FilterButton>
              <Sort />
              Sort
            </FilterButton>
            <FilterButton>
              {/* <Filter /> */}
              Filter
            </FilterButton>
          </React.Fragment>
        )}
      </SearchBar>
    </AppHeader>
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

// export default React.memo(connect(mapStateToProps)(HotelHeader));

const MemoHotelHeader = React.memo(HotelHeader);
export default connect(mapStateToProps)(MemoHotelHeader);
