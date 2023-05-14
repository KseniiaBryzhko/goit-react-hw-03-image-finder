// import css from './FriendListItem.module.css';
// import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.warn('Please enter search query');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="button">
            <ImSearch />
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            value={searchQuery}
            onChange={this.handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

// FriendListItem.propTypes = {
//   avatar: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   isOnline: PropTypes.bool.isRequired,
// };
