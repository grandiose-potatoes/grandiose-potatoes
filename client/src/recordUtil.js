function getPreSignedUrl() {
  // Request to the server to get a presigned url from s3
  // Presigned url allows to post to s3 bucket at a specific endpoint
  return fetch('/api/presigned')
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => {
      console.log('Failed to get pre-signed url');
    });
}

function getSupportedTypes() {
  let options = { mimeType: 'video/webm;codecs=vp9' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(`${options.mimeType} is not supported`);
    options = { mimeType: 'video/webm;codecs=vp8' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(`${options.mimeType} is not Supported`);
      options = { mimeType: 'video/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(`${options.mimeType} is not Supported`);
        options = { mimeType: '' };
      }
    }
  }
  return options;
}

// Function that does a GET request to get an array of questions from our database
function getQuestions() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: '/api/questions',
      success: (data) => {
        resolve(data);
      },
      error: () => {
        reject('Error with getQuestions');
      },
    });
  });
}

// Promise that returns result of ajax request
function putObjectToS3(data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      data: data.superBlob,
      url: data.preSignedUrl,
      processData: false,
      contentType: 'video/webm',
      success: (resp) => {
        // If successful, post video url to db
        resolve(data);
      },
      error: () => {
        reject('error uploading to s3');
      },
    });
  });
}

// Function that is invoked after success of saving video to aws s3
// Posts video public url to server to be saved
// If post successfull server will respond with share code for video
function postVideoUrl(url) {
  // Post to server with publicURL of s3 video
  const data = {
    publicUrl: url,
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      data,
      url: '/api/videos',
      success: (res) => {
        // If successful, post video url to db
        resolve(res.code);
      },
      error: () => {
        reject('Unable to post video to database');
      },
    });
  });
}

export {
  getPreSignedUrl,
  getSupportedTypes,
  getQuestions,
  putObjectToS3,
  postVideoUrl,
};
