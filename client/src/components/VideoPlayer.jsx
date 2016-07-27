import React from 'react';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoUrl: '',
    };
  }

  componentDidMount() {
    console.log('The params:', this.props.params.id);
    this.setVideo(this.props.params.id);
  }

  setVideo(code) {
    this.getVideo(code)
    .then((data) => {
      this.setState({
        videoUrl: data.url,
      });
    })
    .catch((err) => {
      throw err;
    });
  }
  getVideo(code) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: '/api/videos',
        data: { code },
        success: (data) => {
          console.log('the data is:', data);
          resolve(data);
        },
        error: (err) => {
          reject('error getting video:', err);
        },
      });
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <br />
        <br />
        <video controls src={this.state.videoUrl} width="100%" />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string),
};

export default VideoPlayer;
