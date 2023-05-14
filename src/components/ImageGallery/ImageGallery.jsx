import { Component } from 'react';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Searchbar } from '../Searchbar/Searchbar';
import * as ImageService from 'service/image-service';
import { Button } from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    perPage: 12,
    totalResults: 0,
    error: null,
    showGallery: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  handleSubmit = data => {
    this.setState({
      query: data,
      page: 1,
      images: [],
      perPage: 12,
      totalResults: 0,
      error: null,
      showGallery: false,
      isLoading: false,
    });
  };

  getPhotos = async (query, page) => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalResults: totalHits,
      }));
      if (hits.length === 0) {
        this.setState({
          showGallery: true,
        });
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, isLoading, images, totalResults, showGallery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        {showGallery && <p>Sorry, there is no images for your query</p>}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ul>
            {images.map(image => (
              <ImageGalleryItem key={image.id} src={image.webformatURL} />
            ))}
          </ul>
        )}

        {images.length > 0 && images.length < totalResults && (
          <Button onClick={this.handleLoadMore} textChange={isLoading}></Button>
        )}
      </>
    );
  }
}
