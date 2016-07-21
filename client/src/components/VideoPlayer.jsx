import React from 'react';
export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: ''
    }
  }

  componentDidMount() {
    console.log('the params:', this.props.params.id)
    this.getVideo(this.props.params.id)

  }

  render() {
    return(
      <div>
        <h1>Video</h1>
        <video controls src={this.state.videoUrl}/>
      </div>  
    )
  }

  getVideo(code) {
    let setVideoData = (data) => {
      this.setState({
        videoUrl: data.url
      })
    }
    console.log('the code is:', code);
    $.ajax({
      type: 'GET',
      url: '/api/videos',
      data: {code: code},
      success: function(data) {
        console.log('the datat is:', data);
        setVideoData(data);
      },
      error: function(err) {
        console.log('error getting video:', err);
      }
    })
  }
};