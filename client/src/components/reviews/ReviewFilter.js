import React, { useContext, useRef, useEffect } from 'react';
import ReviewContext from '../../context/review/reviewContext';

const ReviewFilter = () => {
  const reviewContext = useContext(ReviewContext);
  const text = useRef('');

  const { filterReviews, clearFilter, filtered } = reviewContext;

  useEffect(() => {
    if(filtered === null) {
      text.current.value = '';
    }
  }); 

  const onChange = e => {
    if (text.current.value !== '') {
      filterReviews(e.target.value);
    } else {
      clearFilter();
    }
  }

  return (
    <form>
        <input ref={text} type="text" placeholder="Filter movies by name or year..." onChange={onChange}/>
    </form>
  )
}

export default ReviewFilter