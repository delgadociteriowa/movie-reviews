import React, { useState, useContext, useEffect } from 'react';
import ReviewContext from '../../context/review/reviewContext';

export const ReviewForm = () => {
  const reviewContext = useContext(ReviewContext);
  
  const { addReview, updateReview, clearCurrent, current } = reviewContext;

  // similar to component did mount
  useEffect(() => {
    if(current !== null) {
      setReview(current)
    } else {
      setReview({
        movieName: '',
        movieYear: '',
        reviewTitle: '',
        reviewText: '',
        reviewRate: '0'
      });
    }
  }, [reviewContext, current])

  const [review, setReview] = useState({
    movieName: '',
    movieYear: '',
    reviewTitle: '',
    reviewText: '',
    reviewRate: '0'
  })

  const { 
    movieName,
    movieYear,
    reviewTitle,
    reviewText,
    reviewRate 
  } = review;

  const onChange = e => 
    setReview({ ...review, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();

    if(current === null){
      addReview(review);
    } else {
      updateReview(review);
    }
    clearCurrent();
  }

  const clearAll = () => {
    clearCurrent();
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? 'Edit Review' : 'Add Review'}</h2>
      <input type="text" placeholder="Movie Name" name="movieName" value={movieName} onChange={onChange}/>
      <input type="text" placeholder="Movie Year" name="movieYear" value={movieYear} onChange={onChange}/>
      <input type="text" placeholder="Title" name="reviewTitle" value={reviewTitle} onChange={onChange}/>
      <input type="text" placeholder="Write your review here" name="reviewText" value={reviewText} onChange={onChange}/>
      <h5>Your final rate is:</h5>
      <input type="radio" name="reviewRate" value="0" checked={reviewRate === '0'} onChange={onChange}/> 0{' '}
      <input type="radio" name="reviewRate" value="1" checked={reviewRate === '1'} onChange={onChange}/> 1{' '}
      <input type="radio" name="reviewRate" value="2" checked={reviewRate === '2'} onChange={onChange}/> 2{' '}
      <input type="radio" name="reviewRate" value="3" checked={reviewRate === '3'} onChange={onChange}/> 3{' '}
      <input type="radio" name="reviewRate" value="4" checked={reviewRate === '4'} onChange={onChange}/> 4{' '}
      <input type="radio" name="reviewRate" value="5" checked={reviewRate === '5'} onChange={onChange}/> 5{' '}
      <input type="radio" name="reviewRate" value="6" checked={reviewRate === '6'} onChange={onChange}/> 6{' '}
      <input type="radio" name="reviewRate" value="7" checked={reviewRate === '7'} onChange={onChange}/> 7{' '}
      <input type="radio" name="reviewRate" value="8" checked={reviewRate === '8'} onChange={onChange}/> 8{' '}
      <input type="radio" name="reviewRate" value="9" checked={reviewRate === '9'} onChange={onChange}/> 9{' '}
      <input type="radio" name="reviewRate" value="10" checked={reviewRate === '10'} onChange={onChange}/> 10
      <div>
        <input type="submit" value={current ? 'Update Review' : 'Add Review'} className="btn btn-primary btn-block"/>
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
      </div>}
    </form>
  )
}

export default ReviewForm