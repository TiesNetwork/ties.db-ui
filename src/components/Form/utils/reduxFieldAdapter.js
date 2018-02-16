export default props => {
  const { children, input, meta: { error, touched }} = props;
  return children({ ...input, ...props, error: touched && error });
}
