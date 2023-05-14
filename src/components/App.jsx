import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    console.log(searchQuery);
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <div>
        <ImageGallery searchQuery={searchQuery} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
