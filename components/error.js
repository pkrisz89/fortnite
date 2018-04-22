const Error = ({ children, show }) => {
  return show ? <p>{children}</p> : null;
};

export default Error;
