export const Button = ({ onClick, textChange }) => {
  return (
    <button type="button" onClick={onClick}>
      {textChange ? 'Loading...' : 'Load more'}
    </button>
  );
};
