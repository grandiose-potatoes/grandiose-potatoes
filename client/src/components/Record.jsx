import React from 'react';
import { getPreSignedUrl, getSupportedTypes, getQuestions, putObjectToS3, postVideoUrl } from '../recordUtil.js';
import Questions from './Questions.jsx';

class Record extends React.Component {
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
      currentQuestion: '',
      finishedRecording: false,
      uploading: false,
      secondsElapsed: null,
      isCountDown: false,
      timeOfRecording: 120,
      timeToShowReminder: 60,
      intervalHandle: null,
    };

    this.toggleRec = this.toggleRec.bind(this);
    this.uploadRec = this.uploadRec.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidMount() {
    this.checkUserProtocol();
    this.loadInitialQuestions();
    this.requestUserMedia();
  }

  checkUserProtocol() {
    const isSecureOrigin = location.protocol === 'https:' || location.host === 'localhost:3000';

    if (!isSecureOrigin) {
      alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
        '\n\nChanging protocol to HTTPS');
      location.protocol = 'HTTPS';
    }
  }

  loadInitialQuestions() {
    getQuestions()
    .then((questionsArr) => {
      questionsArr = _.shuffle(questionsArr);
      this.setState({
        currentQuestion: questionsArr.shift().txt,
        allQuestions: questionsArr,
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  requestUserMedia() {
    // Use native web api for Media Recorder (https://developers.google.com/web/updates/2016/01/mediarecorder)
    // to get the user audio and video
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then((stream) => {
      this.handleConnect(stream);
    })
    .catch(this.handleError);
  }

  toggleRec() {
    // If the user is recording invoke stopRec
    // Else invoke startRec if the user is not recording
    if (this.state.isRec) {
      this.stopRec();
    } else {
      this.startRec();
      this.startTimer();
    }
  }

  uploadRec() {
    // Set the uploading to true to show the loader bar
    this.setState({
      uploading: true,
    });
    // Get the pre-signed url from the server, data in promise is in the following format
    // { preSignedUrl: examplePreSignedUrl, publicUrl: examplePublicUrl }
    getPreSignedUrl()
    .then((data) => {
      // Upload data to S3 with pre-signed url
      // extend the data object to include the superBlob
      data.superBlob = this.state.superBlob;
      return putObjectToS3(data);
    })
      // Take the video's publicUrl and post to the server
    .then((videoData) => postVideoUrl(videoData.publicUrl))
    .then((code) => {
      // Set the share link and remove the spinner from the page
      this.setState({
        link: `${window.location.origin}/videos/${code}`,
        uploading: false,
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  // Function for when a user clicks the next button, they receive another question
  nextQuestion() {
    // This if statement implies that there is at least 1 question
    if (this.state.allQuestions.length > 0) {
      this.setState({
        currentQuestion: this.state.allQuestions.shift().txt,
        allQuestions: this.state.allQuestions,
      });
    } else {
      // If there are no more questions in the array, tell this to the user.
      this.setState({
        currentQuestion: 'Tentatively there are no more questions!',
      });
    }
  }

  copyToClipboard() {
    // Copy share link to clipboard
    $('#shareLink').select();
    document.execCommand("copy");
  }

  handleConnect(stream) {
    // Set the stream state
    // Take user media and create a url that will be added to the video tag src in the DOM
    console.log('Stream connected');
    this.setState({
      stream,
      streamVidUrl: window.URL.createObjectURL(stream),
    });
  }

  handleError(error) {
    // Catch and log error on request of user media
    console.log('Error in request of user media:', error);
  }

  startRec() {
    // Check browswer and set the supported types to options variable
    const options = getSupportedTypes();
    // Toggle button text and set isRec boolean to true and finishedRecordingb boolean to false
    // Set blobs to an empty array
    // Instantiate MediaRecorder
    const mediaRecorder = new MediaRecorder(this.state.stream, options);
    this.setState({
      toggleRecText: 'Stop Recording',
      isRec: true,
      mediaRecorder,
      blobs: [],
      finishedRecording: false,
    });

    // When data becomes available, call function to handle the data
    mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
    mediaRecorder.start(10); // collect 10ms of data
  }

  startTimer() {
    // Start the counter
    this.setState({ intervalHandle: setInterval(this.tick.bind(this), 1000) });
    this.setState({ secondsElapsed: this.state.timeOfRecording });
  }

  handleDataAvailable(event) {
    // If there is data add the data to the blobs array
    if (event.data && event.data.size > 0) {
      this.setState({
        blobs: this.state.blobs.concat(event.data),
      });
    }
  }

  stopRec() {
    // Stop the mediaRecorder and toggle
    this.state.mediaRecorder.stop();
    const options = {
      type: 'video/webm',
    };
    // Create a new blob from the array of blobs
    const superBlob = new Blob(this.state.blobs, options);
    this.setState({
      toggleRecText: 'Start Recording',
      isRec: false,
      superBlob,
      finishedRecording: true,
      recVidUrl: window.URL.createObjectURL(superBlob),
    });
    document.getElementById('recorded').controls = true;
  }

  tick() {
    if (this.state.secondsElapsed > 0) {
      // Showing the reminder
      if (this.state.secondsElapsed === this.state.timeToShowReminder) {
        this.setState({ isCountDown: true });
      }
      // Count down
      this.setState({ secondsElapsed: this.state.secondsElapsed - 1 });
    } else {
      // Only stop when it is recording eg, when the countdown is on
      if (this.state.isCountDown === true) {
        this.stopRec();
        this.setState({ isCountDown: false });
        clearInterval(this.state.intervalHandle);
      }
    }
  }

  render() {
    return (
      <div className="col s8 offset-s2">

        <br />
        <div className={this.state.isCountDown ? '' : 'hide'}>
          <div>Time left for the recording: {this.state.secondsElapsed}</div>
        </div>

        <video className={this.state.finishedRecording ? 'hide' : ''} id="gum" src={this.state.streamVidUrl} autoPlay muted width="100%"></video>
        <video className={this.state.finishedRecording ? '' : 'hide'} id="recorded" src={this.state.recVidUrl} width="100%"></video>

        <div>
          <br />
          <a className="waves-effect waves-light btn blue darken-1" id="record" onClick={this.toggleRec}>{this.state.toggleRecText}</a>
          <a className={this.state.finishedRecording ? 'waves-effect waves-light btn blue darken-1' : 'hide waves-effect waves-light btn blue darken-1'} id="upload" onClick={this.uploadRec}>Share</a>
        </div>

        <div className={this.state.isRec ? '' : 'hide'}>
          <Questions question={this.state.currentQuestion} />
          <a className="waves-effect waves-light btn blue darken-1" id="next" onClick={this.nextQuestion}>How about another question?</a>
        </div>

        <div className={this.state.uploading ? 'progress' : 'hide progress'}>
          <div className="indeterminate"></div>
        </div>

        <div className={this.state.link ? '' : 'hide'}>
          <input id="shareLink" value={this.state.link} />
          <a className="waves-effect waves-light btn blue darken-1" onClick={this.copyToClipboard}>Copy</a>
        </div>
      </div>
    );
  }
}

Record.propTypes = {};

export default Record;
