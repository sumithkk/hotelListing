import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../helpers/customHooks';
// import Hotel from './icons/hotelbg.svg';
import Sort from './icons/sort.svg';
import Filter from './icons/filter.svg';
import Search from '../components/svgComponents/search';

import { locationSearch, getPropertyList } from '../actions';

import LocationData from '../../stubs/hotels/location-search.json';

const AppHeader = styled.div`
  position: relative;
  width: 100%;
  background: #fff;
  z-index: 1;
  height: 330px;
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
  padding: 10px 15px;
  position: relative;
  background: #dedede;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .search {
    position: relative;
    width: 53%;
    input {
      font-size: 1.2rem;
      width: 100%;
      border: 0;
      padding: 15px;
      padding-left: 58px;
      outline: none;
      font-family: 'Rajdhani', sans-serif;
    }
    svg {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
  .dropdown {
    position: absolute;
    top: 53px;
    padding: 15px;
    background: #fff;
    left: 0;
    width: 100%;
    .resultGroup {
      padding: 10px;
      background: #dedede;
    }
    .result {
      padding: 5px;
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

const HotelHeader = () => {
  // Handling Searchbar
  const [loading, setLoading] = useState(true);
  const [landingItems, setLandingItems] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isGettingResults, setGettingResults] = useState(false);
  const [showDrop, toggleDrop] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selection, setSelection] = useState({});
  const [searchResults, setSearchResults] = useState('');

  // Component did mount
  useEffect(() => {
    console.log('Header mounted');
    window.localStorage.setItem('theme', 'light');
  }, []);

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
    setLandingItems('');
    setSelection(item);
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

  useEffect(() => {
    console.log('Search Selected');
    //do something
  }, [selection]);

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

  return (
    <AppHeader className="hotelHeader">
      <HeaderTitle>
        <h1>HOTEL</h1>
        <p>Find Hotels around the World !</p>
      </HeaderTitle>
      {/* <Hotel /> */}
      <BottomHeader>
        <SearchBar>
          <div className="search">
            <input
              placeholder="Search for Cities, Landmark, Hotels"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isSearching ? <div className="bounceball" /> : <Search width="30px" height="30px" />}

            {showDrop && (
              <div className="dropdown">
                {results.length > 0 &&
                  results.map((result, i) => (
                    <div key={i}>
                      {/* <div className="resultGroup">{result.group}</div> */}
                      {result.entities.map((e) => (
                        <div className="result" onClick={() => handleSelection(e)}>
                          {e.name}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
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
      </BottomHeader>
    </AppHeader>
  );
};

export default HotelHeader;
