import React from 'react';

export let Questions = function (props) {
  return (
    <div>
      <h5>Question for you to talk about:</h5>
      <p>{props.question}</p>
    </div>
  );
};
