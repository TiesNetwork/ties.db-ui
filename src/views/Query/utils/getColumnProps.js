export default (name, type) => {
  const props = {
    accessor: name,
    Header: name,
    Cell: ({ value = 0 }) => value.toString(),
    style: { textAlign: 'right' },
    width: 120,
  };

  switch (type) {
    case 'binary':
      props.Cell = ({ value = 0 }) => `0x${value.toString('hex')}`;
      props.style = { textAlign: 'left' };
      props.width = 120;
      break;
    case 'boolean':
      props.style = { textAlign: 'center' };
      props.width = 60;
      break;
    case 'time':
      props.style = { textAlign: 'left' };
      props.width = 200;
      break;
    case 'ascii':
    case 'string':
      props.style = { textAlign: 'left' };
      props.width = 200;
      break;
    case 'uuid':
      props.style = { textAlign: 'left' };
      props.width = 160;
      break;
    default:
      break;
  }

  return props;
};
