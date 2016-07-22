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
