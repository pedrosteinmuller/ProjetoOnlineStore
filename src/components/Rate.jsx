import React from 'react';
import '../CSS/StarRating.css';

class StarRating extends React.Component {
  state = {
    rating: 0,
    hover: 0,
  };

  ratingButtons = (stars) => {
    this.setState({
      rating: stars,
    });
  };

  ratingHover = (stars) => {
    this.setState({
      hover: stars,
    });
  };

  render() {
    const { rating, hover } = this.state;
    const starsNumber = 5;
    return (
      <div className="star-rating-area">
        {[...Array(starsNumber)].map((star, index) => {
          index += 1;
          return (
            <button
              data-testid={ `${index}-rating` }
              type="button"
              key={ index }
              className={ index <= (hover || rating) ? 'on' : 'off' }
              onClick={ () => this.ratingButtons(index) }
              onMouseEnter={ () => this.ratingHover(index) }
              onMouseLeave={ () => this.ratingHover(rating) }
              // https://www.w3schools.com/jsref/event_onmouseenter.asp
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  }
}

// referencia para realizar o StarRating
// https://www.youtube.com/watch?v=eDw46GYAIDQ

export default StarRating;
