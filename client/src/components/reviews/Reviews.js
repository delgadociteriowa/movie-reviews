import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReviewItem from './ReviewItem';
import ReviewContext from '../../context/review/reviewContext';

export const Reviews = () => {
  const reviewContext = useContext(ReviewContext);

  const { reviews, filtered } = reviewContext;

  if(reviews.length === 0 ) {
    return <h4>Please add a review</h4>
  }

  return (
    <Fragment>
      <TransitionGroup>
      {filtered !== null ? filtered.map(review => (
          <CSSTransition key={review.id} timeout={500} classNames="item">
            <ReviewItem review={review} />
          </CSSTransition>
          )) : reviews.map(review => (
          <CSSTransition key={review.id} timeout={500} classNames="item">
            <ReviewItem review={review} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Reviews
