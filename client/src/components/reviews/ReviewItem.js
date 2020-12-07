import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReviewContext from '../../context/review/reviewContext';

export const ReviewItem = ({ review }) => {
  const reviewContext = useContext(ReviewContext);
  const { deleteReview, setCurrent, clearCurrent } = reviewContext;

  const {
    id,
    movieName,
    movieYear,
    reviewTitle,
    reviewText,
    reviewRate
  } = review;

  const onDelete = () => {
    deleteReview(id);
    clearCurrent();
  }

  return (
    <div className='card bg-light'>
      <h3 className="text-primary text-left">
        {movieName}{' - '}{movieYear} ({reviewRate} / 10)
      </h3>
      <h4>{ reviewTitle}</h4>
      <p>
        { reviewText }
      </p>
      <p>
        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(review)}>Edit</button>
        <button className="btn  btn-danger btn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
}
export default ReviewItem
