// import css from './FriendListItem.module.css';
// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src }) => {
  return (
    <li className="gallery-item">
      <img src={src} alt="" />
    </li>
  );
};

// FriendListItem.propTypes = {
//   avatar: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   isOnline: PropTypes.bool.isRequired,
// };
