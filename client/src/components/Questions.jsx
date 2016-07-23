import React from 'react';

export let Questions = function (props) {
  return (
    <div>
      <h2>Question for you to talk about:</h2>
      <p>{props.question}</p>
    </div>
  );
};