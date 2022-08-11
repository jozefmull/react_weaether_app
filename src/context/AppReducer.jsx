// Reducer is how we specify application state changes in response to certain actions to our context
export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_UNITS':
      return {
        ...state,
        units: action.payload,
      }
    case 'GET_WEATHER':
      return {
        ...state,
        currWeather: { city: action.payload[2].label, ...action.payload[0] },
        forecastWeather: {
          city: action.payload[2].label,
          ...action.payload[1],
        },
        loading: false,
        searchData: action.payload[2],
      }
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
