'use strict';
import React from 'react';
export default class Record extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mediaRecorder: null,
      stream: null,
      streamVidUrl: null,
      toggleRecText: 'Start Recording',
      isRec: false,
      blobs: [],
      superBlob: null,
      recVidUrl: null
    }
  }

  componentDidMount() {

    // var getQuestion = function(txt) {
    //   this.setState({
    //     question: txt
    //   })
    // }.bind(this);

    // $.ajax({
    //   method: 'GET',
    //   url: '/api/questions',
    //   success: function(data) {
    //     getQuestion(data[0].txt);
    //   }
    // })
    this.requestUserMedia()
  }
  render() {
    return (
      <div>
        <h1> Record a Video </h1>
        <video id="gum" src={this.state.streamVidUrl} autoPlay muted></video>
        <div>
          <button id="record" onClick={this.toggleRec.bind(this)}>{this.state.toggleRecText}</button>
          <button id="play" onClick={this.playRec.bind(this)}>Play</button>
          <button id="upload" onClick={this.uploadRec.bind(this)}>Share</button>
        </div>
        <video id="recorded" autoPlay loop src={this.state.recVidUrl}></video>
      </div>
    )
  }

  requestUserMedia() {
    //Use native web api for Media Recorder (https://developers.google.com/web/updates/2016/01/mediarecorder)
    //to get the user audio and video
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).
    then(this.handleConnect.bind(this)).catch(this.handleError);
  }

  handleConnect(stream) {
    //Set the stream state
    //Take user media and create a url that will be appended to the video tag in the DOM
    console.log('Stream connected'); 
    this.setState({
      stream: stream,
      streamVidUrl: window.URL.createObjectURL(stream)
    })
  }

  handleError(error) {
    //Catch and log error on request of user media
    console.log('error in request of user media:', error);
  }

  toggleRec() {
    if (this.state.isRec) {
      this.stopRec()
    } else {
      this.startRec()
    }
  }

  startRec() {  
    //Check browswer and set the supported types to options
    let options = this.getSupportedTypes()
    //Toggle button text and set recording boolean to true
    //Instantiate MediaRecorder
    let mediaRecorder = new MediaRecorder(this.state.stream, options)
    this.setState({
      toggleRecText: 'Stop Recording',
      isRec: true,
      mediaRecorder: mediaRecorder,
      blobs: []
    })

    //When data becomes available, call function to handle the data
    mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
    mediaRecorder.start(10); // collect 10ms of data
  }

  handleDataAvailable(event) {
    //If there is data add the data to the blobs array
    console.log(event.data);
    if (event.data && event.data.size > 0) {
      this.setState({
        blobs: this.state.blobs.concat(event.data)
      })
    }
  }

  stopRec() {
    //Stop the mediaRecorder and toggle
    this.state.mediaRecorder.stop();
    console.log('Recorded Blobs:', this.state.blobs)
    //Create a new blob from the array of blobs
    let options = {
      type: 'video/webm'
    }
    let superBlob = new Blob(this.state.blobs, options)
    this.setState({
      toggleRecText: 'Start Recording',
      isRec: false,
      superBlob: superBlob
    })
  }

  playRec() {
    //Give the video element control buttons
    document.getElementById('recorded').controls = true
    //Allow user to play back recording
    console.log('the super blob', this.state.superBlob);
    this.setState({
      recVidUrl: window.URL.createObjectURL(this.state.superBlob)
    })
  }

  uploadRec() {
    //Post request to the server to get a presigned url from s3
    //Presigned url allows to post to s3 bucket at a specific endpoint
    let putObject = this.putObject.bind(this);
    $.ajax({
      type: 'POST',
      url:'/api/videos', // this is our own server 
      success: function(data) {
        //Function to put the data to s3 with the preSignedUrl
        putObject(data.preSignedUrl); 
      },
      error: function() {
        console.log('error getting preSignedUrl');
      }
    })
  }

  putObject(preSignedUrl) {
    let superBlob = this.state.superBlob;
    console.log('the superBlob:', superBlob);
    $.ajax({
      type: 'PUT', 
      data: superBlob, 
      url: preSignedUrl, 
      processData: false,
      contentType: 'video/webm', 
      success: function(data){
        console.log('object put in S3 ', data);
      },
      error: function() {
        console.log('error uploading to s3');
      }
    })
  }

  getSupportedTypes() {
    let options = {mimeType: 'video/webm;codecs=vp9'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = {mimeType: 'video/webm;codecs=vp8'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: 'video/webm'};
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.log(options.mimeType + ' is not Supported');
          options = {mimeType: ''};
        }
      }
    }
    return options
  }
}