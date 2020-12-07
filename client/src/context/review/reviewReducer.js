import {
  ADD_REVIEW,
  DELETE_REVIEW,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_REVIEW,
  FILTER_REVIEWS,
  CLEAR_FILTER
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews]
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review => review.id === action.payload.id ? action.payload : review)
      }
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.payload)
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case FILTER_REVIEWS:
      return {
        ...state,
        filtered: state.reviews.filter(review => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return review.movieName.match(regex) || review.movieYear.match(regex) 
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    default:
      return state;
  }

}