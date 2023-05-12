import { Component } from 'react';
// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '34521727-b40265d11824baf1c84600c97';

export class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.searchQuery !== this.props.searchQuery) {
    //   console.log(prevProps.searchQuery);
    //   console.log(this.props.searchQuery);
    //   console.log('change');
    // }
    if (prevProps.images !== this.props.images) {
      console.log(prevProps.images);
      console.log(this.props.images);
      console.log('change');
    }
  }

  render() {
    return (
      <ul>
        {this.props.images.map(({ id, webformatURL, largeImageURL }) => (
          <li className="gallery-item" key={id}>
            <img src={webformatURL} alt="" />
          </li>
        ))}
      </ul>
    );
  }
}
