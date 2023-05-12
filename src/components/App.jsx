import React, { Component } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34521727-b40265d11824baf1c84600c97';

// const ImageGallery = ({ images }) => (
//   <ul>
//     {images.map(({ id, webformatURL, largeImageURL }) => (
//       <li class="gallery-item" key={id}>
//         <img src={webformatURL} alt="" />
//       </li>
//     ))}
//   </ul>
// );

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    error: null,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    console.log(searchQuery);
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(
        `/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        images: response.data.hits,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div>
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && (
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          )}
          {images.length > 0 && <ImageGallery images={images} />}
        </div>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}

// let prevSearchQuery = '';

// async function fetchImages(searchQuery) {
//   if (searchQuery === prevSearchQuery) {
//     page += 1;
//   } else {
//     page = 1;
//     prevSearchQuery = searchQuery;
//   }
//   const params = {
//     q: `${searchQuery}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     page: `${page}`,
//     per_page: `${perPage}`,
//   };

//   const urlAXIOS = `?key=${API_KEY}`;

//   const { data } = await axios.get(urlAXIOS, { params });
