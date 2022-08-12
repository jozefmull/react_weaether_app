import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

import { AsyncPaginate } from 'react-select-async-paginate'
import { apiOptions, GEO_API_URL } from '../API'

const Search = () =>
  // { onSearchChange }
  {
    const { getWeather } = useContext(GlobalContext)
    const [search, setsearch] = useState(null)

    const loadOptions = (inputVals) => {
      // code from API docs to fetch cities data
      return (
        fetch(
          //fetch from URL , min population off 30 000 and name from input
          `${GEO_API_URL}?minPopulation=30000&namePrefix=${inputVals}`,
          apiOptions
        )
          //convert response to json
          .then((response) => response.json())
          // return options with array of objects with value and label
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                }
              }),
            }
          })
          .catch((err) => console.log(err))
      )
    }
    //handle change of an input
    const handleChange = (searchData) => {
      //on change set search to value we typed
      setsearch(searchData)
      //call on search function passed from parent
      getWeather(searchData)
    }

    return (
      <AsyncPaginate
        placeholder='Search city'
        //600 ms timeout because we dont want to fetch every keypress but after certain timeout
        debounceTimeout={600}
        value={search}
        onChange={handleChange}
        loadOptions={loadOptions}
      />
    )
  }

export default Search
