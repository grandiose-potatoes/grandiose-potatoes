import React from 'react';
export var VideoPlayer = function (props) {
  if (props.video) {

    return (
      <div>
        <iframe width="560" height="315" src={props.video.url}></iframe>
      </div>
    )
  } else {
    return (
      <h1>LOADING</h1>
    )
  }
};