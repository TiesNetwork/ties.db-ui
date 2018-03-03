export default ({
  defaultValue,
  hash,
  name,
  tableHash,
  type,
}) => ({
  defaultValue,
  data: {
    hash,
    isEmpty: !name,
    tableHash,
  },
  name: { name, type },
});
