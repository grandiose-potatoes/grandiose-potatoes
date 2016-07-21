export let getPreSignedUrl = (superBlob) => {
  //Request to the server to get a presigned url from s3
  //Presigned url allows to post to s3 bucket at a specific endpoint
  return fetch('/api/presigned')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    data.superBlob = superBlob
    return data
  })
  .catch((err) => {
    console.log('Failed to get pre-signed url');
  })
}

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
  return options
}

export let putObjectToS3 = (data, callback) => {
  $.ajax({
    type: 'PUT', 
    data: data.superBlob, 
    url: data.preSignedUrl, 
    processData: false,
    contentType: 'video/webm', 
    success: function(resp){
      //If successful, post video url to db
      callback(data.publicUrl)
    },
    error: function() {
      return 'error uploading to s3'
    }
  })
}

export let postVideoUrl = (url) => {
  //Post to server with publicURL of s3 video
  let data = {
    publicURL: url
  }
  $.ajax({
    type: 'POST', 
    data: data,
    url: '/api/videos', 
    success: function(data){
      //If successful, post video url to db
      console.log(data)
    },
    error: function() {
      return 'error uploading to s3'
    }
  })
}