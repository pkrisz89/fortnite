const Error = ({children, show}) => {
  return show
    ? <p className="error">{children}</p>
    : null;
};

export default Error;
