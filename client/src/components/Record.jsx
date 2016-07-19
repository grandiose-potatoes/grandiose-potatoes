'use strict';
import React from 'react';
export let Record = (props) => {
  return (
    <div>
      <h1> Record a Video </h1>
      <video id="gum" autoplay muted></video>
      <div>
        <button id="record">Start Recording</button>
        <button id="play" disabled>Play</button>
        <button id="download" disabled>Download</button>
      </div>
      <video id="recorded" autoplay loop></video>
    </div>
  )
}