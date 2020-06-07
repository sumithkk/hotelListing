import React, { useState, useEffect, useRef } from 'react';
import LocationData from '../../stubs/hotels/location-search.json';
import SearchIcon from '../components/svgComponents/search';
import Location from '../components/svgComponents/location';
import axios from 'axios';
import styled from 'styled-components';
import { useDebounce, useLocalStorage } from '../../helpers/customHooks';
import Pin from '../components/svgComponents/hotelIcons/Pin';

const BounceBall = styled.div`
  .bounceball {
    display: inline-block;
    height: 37px;
    width: 15px;
    position: absolute;
    left: 15px;
    top: 15px;
  }
  .bounceball:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ea4c89;
    transform-origin: 50%;
    animation: bounce 500ms alternate infinite ease;
  }
  @keyframes bounce {
    0% {
      top: 20px;
      height: 5px;
      border-radius: 60px 60px 20px 20px;
      transform: scaleX(2);
    }
    35% {
      height: 15px;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0;
    }
  }
`;
// Usage
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [showDrop, toggleDrop] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [location, setLocation] = useLocalStorage('location', '');
  const inputRef = useRef();

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        toggleDrop(false);
        searchCharacters(debouncedSearchTerm).then((results) => {
          if (results) {
            setIsSearching(false);
            toggleDrop(true);
            setResults(results);
          }
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleSelection = (item) => {
    setEditLocation(false);
    setLocation(item.name);
    toggleDrop(false);
  };

  const toggleEdit = () => {
    setEditLocation(!editLocation);
  };

  const toggleOnMouseLeave = () => {
    console.log(inputRef);
    if (location !== '' && !isSearching) {
      setEditLocation(!editLocation);
    }
  };
  return (
    <React.Fragment>
      <div className={editLocation && location === '' ? 'search' : 'search selected'}>
        {editLocation && location === '' ? (
          <label>
            <input
              placeholder="Search for Cities, Landmark, Hotels"
              //   value={searchTerm}
              ref={inputRef}
              onMouseLeave={() => toggleOnMouseLeave()}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        ) : (
          <div>
            <label>
              <input readOnly onMouseEnter={() => toggleEdit()} value={location} />
            </label>
          </div>
        )}

        {isSearching ? (
          <BounceBall>
            <div className="bounceball" />
          </BounceBall>
        ) : editLocation ? (
          <SearchIcon fill="rgb(188,190,192)" width="20px" height="20px" />
        ) : (
          <Pin />
        )}

        {showDrop && (
          <div className="dropdown">
            {results.length > 0 &&
              results.map((result, i) => (
                <div key={i}>
                  {/* <div className="resultGroup">{result.group}</div> */}
                  {result.entities.map((itm, idx) => (
                    <div key={idx} className="result" onClick={() => handleSelection(itm)}>
                      {itm.name}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Search;

// API search function
function searchCharacters(search) {
  const apiKey = '10222574241081792';
  return axios
    .get(`http://makeup-api.herokuapp.com/api/v1/products.json`)
    .then((r) => LocationData.suggestions)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
