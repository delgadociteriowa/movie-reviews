import React from 'react';
import Reviews from '../reviews/Reviews';
import ReviewForm from '../reviews/ReviewForm';
import ReviewFilter from '../reviews/ReviewFilter';

export const Home = () => {
  return (
    <div>
      <div>
        <ReviewForm/>
      </div>
      <div>
        <ReviewFilter />
        <Reviews />
      </div>
    </div>
  )
}

export default Home