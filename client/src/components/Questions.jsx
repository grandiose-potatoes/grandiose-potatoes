import React from 'react';

function Questions(props) {
  return (
    <div>
      <h5>Question for you to talk about:</h5>
      <p>{props.question}</p>
    </div>
  );
}

Questions.propTypes = {
  question: React.PropTypes.string,
};

export default Questions;
