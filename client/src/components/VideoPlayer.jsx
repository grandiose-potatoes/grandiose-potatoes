import React from 'react';
export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: ''
    };
  }

  componentDidMount() {
    console.log('the params:', this.props.params.id);
    this.setVideo(this.props.params.id);
  }

  render() {
    return (
      <div className='col s8 offset-s2'>
        <br/>
        <br/>
        <video controls src={this.state.videoUrl} width="100%"/>
      </div>
    );
  }

  setVideo(code) {
    this.getVideo(code)
    .then((data) => {
      this.setState({
        videoUrl: data.url
      });
    })
    .catch((err) => {
      throw err;
    })
  }
  getVideo(code) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: '/api/videos',
        data: {code: code},
        success: function(data) {
          console.log('the data is:', data);
          resolve(data);
        },
        error: function(err) {
          reject('error getting video:', err);
        }
      })
    })
  }
}
