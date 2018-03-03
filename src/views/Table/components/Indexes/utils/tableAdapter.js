export default ({
  fields,
  hash,
  name,
  tableHash,
  type,
}) => ({
  fields,
  data: {
    hash,
    isEmpty: !name,
    tableHash,
  },
  name: { name, type },
});
