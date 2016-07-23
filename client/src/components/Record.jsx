'use strict';
import React from 'react';
import { getPreSignedUrl, getSupportedTypes, getQuestions, putObjectToS3, postVideoUrl } from '../recordUtil.js';
import {Questions} from './Questions.jsx';
export default class Record extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mediaRecorder: null,
      stream: null,
      streamVidUrl: null,
      toggleRecText: 'Start Recording',
      isRec: false,
      blobs: [],
      superBlob: null,
      recVidUrl: null,
      link: '', 
      allQuestions: null,
      currentQuestion: null,
      postStop: true
    };
  }
  componentDidMount() {

    this.setInitialQuestions();
    this.requestUserMedia();

  }

  render() {
    return (
      <div>
        <h1> Record a Video </h1>
        <video id="gum" src={this.state.streamVidUrl} autoPlay muted></video>
        <div>
          <button id="record" onClick={this.toggleRec.bind(this)}>{this.state.toggleRecText}</button>
          <button className={this.state.postStop ? 'hidden' : ''} id="play" onClick={this.playRec.bind(this)}>Play</button>
          <button className={this.state.postStop ? 'hidden' : ''} id="upload" onClick={this.uploadRec.bind(this)}>Share</button>
        </div>
       
        <div className={!this.state.isRec ? 'hidden' : ''}>
          <Questions question={this.state.currentQuestion}/>
          <button id="next" onClick={this.nextQuestion.bind(this)}>How about another question?</button>
        </div>

        <video id="recorded" autoPlay loop src={this.state.recVidUrl}></video>
        <input id='shareLink'value={this.state.link} />
        <button onClick={this.copyToClipboard('#shareLink')}>Copy</button>
      </div>
    );
  }

  setInitialQuestions() {
    getQuestions()
    .then((questionsArr) => {
      questionsArr = _.shuffle(questionsArr);
      console.log('This is the questionsArr: ', questionsArr);
      this.setState({
        currentQuestion: questionsArr.shift().txt,
        allQuestions: questionsArr
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  copyToClipboard(element) {
    console.log(element)
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    console.log()
    document.execCommand("copy");
    $temp.remove();
  };


  requestUserMedia() {
    //Use native web api for Media Recorder (https://developers.google.com/web/updates/2016/01/mediarecorder)
    //to get the user audio and video
    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then((stream) => {
      this.handleConnect(stream);
    })
    .catch(this.handleError);
  }

  handleConnect(stream) {
    //Set the stream state
    //Take user media and create a url that will be appended to the video tag in the DOM
    console.log('Stream connected'); 
    this.setState({
      stream: stream,
      streamVidUrl: window.URL.createObjectURL(stream)
    });
  }

  handleError(error) {
    //Catch and log error on request of user media
    console.log('error in request of user media:', error);
  }

  toggleRec() {
    if (this.state.isRec) {
      this.stopRec();
    } else {
      this.startRec();
    }
  }

  startRec() {  
    //Check browswer and set the supported types to options
    let options = getSupportedTypes();
    //Toggle button text and set recording boolean to true
    //Instantiate MediaRecorder
    let mediaRecorder = new MediaRecorder(this.state.stream, options);
    this.setState({
      toggleRecText: 'Stop Recording',
      isRec: true,
      mediaRecorder: mediaRecorder,
      blobs: [],
      postStop: true,
      shouldHide: false
    });

    //When data becomes available, call function to handle the data
    mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
    mediaRecorder.start(10); // collect 10ms of data

    // Only append next question after start recording 

  }

  handleDataAvailable(event) {
    //If there is data add the data to the blobs array
    if (event.data && event.data.size > 0) {
      this.setState({
        blobs: this.state.blobs.concat(event.data)
      });
    }
  }

  stopRec() {
    //Stop the mediaRecorder and toggle
    this.state.mediaRecorder.stop();
    console.log('Recorded Blobs:', this.state.blobs);
    //Create a new blob from the array of blobs
    let options = {
      type: 'video/webm'
    };
    let superBlob = new Blob(this.state.blobs, options);
    this.setState({
      toggleRecText: 'Start Recording',
      isRec: false,
      superBlob: superBlob,
      postStop: false
    });
  }

  playRec() {
    //Give the video element control buttons
    document.getElementById('recorded').controls = true;
    //Allow user to play back recording
    console.log('the super blob', this.state.superBlob);
    this.setState({
      recVidUrl: window.URL.createObjectURL(this.state.superBlob)
    });
  }


  uploadRec() {
    //Get the pre-signed url from the server, data in promise is in the following format
    // { preSignedUrl: examplePreSignedUrl, publicUrl: examplePublicUrl, superBlob: exampleSuperBlob}
    getPreSignedUrl()
    .then((data) => {
      //Upload data to S3 with pre-signed url
      data.superBlob = this.state.superBlob;
      return putObjectToS3(data);
    })
    .then((videoData) => {
      return postVideoUrl(videoData.publicUrl);
    })
    .then((code) => {
      this.setState({
        link: `${window.location.origin}/videos/${code}`
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  //function for when a user clicks the next button, they receive another question
  nextQuestion() {
    //this if statement implies that there is at least 1 question
    if (this.state.allQuestions.length > 0) {
      this.setState({
        currentQuestion: this.state.allQuestions.shift().txt,
        allQuestions: this.state.allQuestions
      });
    } else {
      //if there are no more questions in the array, tell this to the user.
      this.setState({
        currentQuestion: 'Tentatively there are no more questions!'
      });
    }
  }
}