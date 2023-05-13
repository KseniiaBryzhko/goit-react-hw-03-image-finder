import { Component } from 'react';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34521727-b40265d11824baf1c84600c97';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    perPage: 12,
    totalResults: 0,
    showGallery: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ isLoading: true, images: [] });

      try {
        const response = await axios.get(
          `/?q=${this.props.searchQuery}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
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
  }

  render() {
    const { error, isLoading, images } = this.state;
    return (
      <>
        {!this.props.searchQuery && <p>Enter smth</p>}
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
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {images.length > 0 ? (
          <ul>
            {images.map(image => (
              <ImageGalleryItem key={image.id} src={image.webformatURL} />
            ))}
          </ul>
        ) : (
          <p>Sorry, there is no images for your query</p>
        )}
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
