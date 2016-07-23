export let getPreSignedUrl = () => {
  //Request to the server to get a presigned url from s3
  //Presigned url allows to post to s3 bucket at a specific endpoint
  return fetch('/api/presigned')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log('Failed to get pre-signed url');
  });
};

export let getSupportedTypes = () => {
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
  return options;
};


//function that does a GET request to get an array of questions from our database
export let getQuestions = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET', 
      url: '/api/questions', 
      success: function(data) {
        resolve(data);
      },
      error: function() {
        reject('Error with getQuestions');
      }
    });
  })
};

//Promise that returns result of ajax request
export let putObjectToS3 = (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT', 
      data: data.superBlob, 
      url: data.preSignedUrl, 
      processData: false,
      contentType: 'video/webm', 
      success: function(resp) {
        //If successful, post video url to db
        resolve(data);
      },
      error: function() {
        reject('error uploading to s3');
      }
    });
  });
}

//Function that is invoked after success of saving video to aws s3
//Posts video public url to server to be saved
//If post successfull server will respond with share code for video
export let postVideoUrl = (url) => {
  //Post to server with publicURL of s3 video
  let data = {
    publicUrl: url
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST', 
      data: data,
      url: '/api/videos', 
      success: function(data) {
        //If successful, post video url to db
        resolve(data.code);
      },
      error: function() {
        reject('Unable to post video to database');
      }
    });
  })
}
