import React, { useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';
import ReviewContext from './reviewContext';
import ReviewReducer from './reviewReducer';
import {
  ADD_REVIEW,
  DELETE_REVIEW,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_REVIEW,
  FILTER_REVIEWS,
  CLEAR_FILTER
} from '../types';

const ReviewState = props => {
  const initialState = {
    reviews: [
      {
        id: 1,
        movieName: 'Tarzan',
        movieYear: '1999',
        reviewTitle: 'A good movie',
        reviewText: 'A Lorem ipsun dolor sit amet',
        reviewRate: '8'
      },
      {
        id: 2,
        movieName: 'Atlantis',
        movieYear: '1999',
        reviewTitle: 'A good movie atlantis',
        reviewText: 'B Lorem ipsun dolor sit amet',
        reviewRate: '9'
      },
      {
        id: 3,
        movieName: 'Mulan',
        movieYear: '1999',
        reviewTitle: 'A good movie mulan',
        reviewText: 'C Lorem ipsun dolor sit amet',
        reviewRate: '10'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ReviewReducer, initialState);

  // Add Review
  const addReview = review => {
    review.id = uuidv4();
    dispatch({ type: ADD_REVIEW, payload: review})
  }

  // Delete Review
  const deleteReview = id => {
    dispatch({ type: DELETE_REVIEW, payload: id })
  }

  // Set Current Review
  const setCurrent = review => {
    dispatch({ type: SET_CURRENT, payload: review })
  }

  // Clear Current Review
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Update Review
  const updateReview = review => {
    dispatch({ type: UPDATE_REVIEW, payload: review })
  }

  // Filter Reviews
  const filterReviews = text => {
    dispatch({ type: FILTER_REVIEWS, payload: text })
  }

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews: state.reviews,
        current: state.current,
        filtered: state.filtered,
        addReview,
        deleteReview,
        setCurrent,
        clearCurrent,
        updateReview,
        filterReviews,
        clearFilter
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  )
};

export default ReviewState