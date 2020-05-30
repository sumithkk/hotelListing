import React, { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';
import useDebounce from '../../helpers/customHooks';
// import Hotel from './icons/hotelbg.svg';
import Sort from './icons/sort.svg';
import Filter from './icons/filter.svg';
import Search from '../components/svgComponents/search';
import User from '../components/svgComponents/user';
import Location from '../components/svgComponents/location';
import { locationSearch, getPropertyList } from '../actions';
import { Link } from 'react-router-dom';
import { DateRangeInput } from '@datepicker-react/styled';
import { parseISO } from 'date-fns';

import LocationData from '../../stubs/hotels/location-search.json';
import { connect } from 'react-redux';

const AppHeader = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  z-index: 1;
  margin-bottom: 30px;
  position: fixed;
  top: 0;
  background: #fff;
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
  }
  .search {
    position: relative;
    width: 35%;
    border-bottom: 1px solid #bcbec0;
    &.selected {
      border: 1px solid #bcbec0;
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
    }

    svg {
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
  label,
  input {
    border-radius: 5px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    font-weight: normal;
  }
  input {
    padding: 0 50px;
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
  border: 1px solid #bcbec0;
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
    width: 100px;
    border-radius: 5px;
    font-family: 'Ubuntu', sans-serif;
    font-size: 1rem;
    outline: none;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDrop, toggleDrop] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selection, setSelection] = useState({});
  const [searchResults, setSearchResults] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);
  const [adult, setAdult] = useState(1);
  const [editLocation, setEditLocation] = useState(false);

  const handleChange = (e) => {
    setEditLocation(true);
    setSearchTerm(e.target.value);
  };

  const searchCharacters = (query) => {
    setIsSearching(false);
    toggleDrop(true);
    console.log(LocationData.suggestions);
    setResults(LocationData.suggestions);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  // Handling Selection
  const handleSelection = (item) => {
    // window.localStorage.setItem('location', JSON.stringify(item));
    setSearchTerm(item.name);
    setSelection(item);
    setEditLocation(false);
    toggleDrop(false);
    setLoading(true);
    getPropertyList();

    // var unirest = require("unirest");
    // var req = unirest("GET", "https://hotels4.p.rapidapi.com/properties/list");
    // req.query({
    //   currency: "USD",
    //   locale: "en_US",
    //   sortOrder: "PRICE",
    //   destinationId: item.destinationId,
    //   pageNumber: "1",
    //   checkIn: "2020-01-08",
    //   checkOut: "2020-01-15",
    //   pageSize: "24",
    //   adults1: "1",
    // });

    // req.headers({
    //   "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //   "x-rapidapi-key": "4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8",
    //   useQueryString: true,
    // });

    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);
    //   setSearchResults(res.body.data.body);
    //   setLoading(false);
    // });
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  };

  const handleSearch = () => {
    window.location.pathname = `/hotels/${selection.destinationId}/${`PRICE`}/${
      state.startDate !== null ? formatDate(state.startDate) : formatDate(new Date())
    }/${state.endDate !== null ? formatDate(state.endDate) : ''}/${adult}/${props.page + 1}/`;
  };

  // useEffect(() => {
  //   console.log('Search Selected');
  //   //do something
  // }, [selection]);

  useEffect(() => {
    // var unirest = require("unirest");
    // var req = unirest("GET", "https://hotels4.p.rapidapi.com/properties/list");
    // req.query({
    //   currency: "USD",
    //   locale: "en_US",
    //   sortOrder: "PRICE",
    //   destinationId: "678196",
    //   pageNumber: "1",
    //   checkIn: "2020-01-08",
    //   checkOut: "2020-01-15",
    //   pageSize: "24",
    //   adults1: "1",
    // });
    // req.headers({
    //   "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //   "x-rapidapi-key": "4c985af0e6mshe02508316d3d9d6p1b2493jsn1bb8a5f16ce8",
    //   useQueryString: true,
    // });
    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);
    //   setLandingItems(res.body.data.body);
    //   setLoading(false);
    // });
  }, []);
  console.log(props);

  return (
    <AppHeader className="hotelHeader">
      <SearchBar>
        <div className="brand">HoTEL</div>
        <div className={editLocation ? 'search' : 'search selected'}>
          <input
            placeholder="Search for Cities, Landmark, Hotels"
            value={searchTerm}
            onChange={(e) => handleChange(e)}
          />
          {isSearching ? (
            <div className="bounceball" />
          ) : editLocation ? (
            <Search fill="rgb(188,190,192)" width="20px" height="20px" />
          ) : (
            <Location fill="rgb(188,190,192)" width="20px" height="20px" />
          )}

          {showDrop && (
            <div className="dropdown">
              {results.length > 0 &&
                results.map((result, i) => (
                  <div key={i}>
                    {/* <div className="resultGroup">{result.group}</div> */}
                    {result.entities.map((e, idx) => (
                      <div key={idx} className="result" onClick={() => handleSelection(e)}>
                        {e.name}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}
        </div>
        <DateWrap style={{ marginLeft: '30px' }}>
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
          <input type="number" value={adult} name="adult" onChange={() => setAdult()} />
        </Adult>
        <CTA type="button" name="search" onClick={() => handleSearch()}>
          Search
        </CTA>
        {/* ${selection.destinationId}?currency=${`USD`}&locale=${`en_US`}&sortOrder=${`PRICE`}
        &checkIn=${state.startDate !== null ? formatDate(state.startDate) : ''}&checkOut=$
        {state.endDate !== null ? formatDate(state.endDate) : ''}&adults=${adult}&page=$
        {props.page + 1} */}
        <Link
          to={{
            pathname: `/hotels/${selection.destinationId}/${`USD`}/${`en_US`}/${`PRICE`}/${
              state.startDate !== null ? formatDate(state.startDate) : ''
            }/${state.endDate !== null ? formatDate(state.endDate) : ''}/${adult}/${
              props.page + 1
            }`,
            state: {
              fromNotifications: true,
            },
          }}
        >
          Search
        </Link>
        {searchResults !== '' && (
          <React.Fragment>
            <FilterButton>
              <Sort />
              Sort
            </FilterButton>
            <FilterButton>
              <Filter />
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

export default React.memo(connect(mapStateToProps)(HotelHeader));
