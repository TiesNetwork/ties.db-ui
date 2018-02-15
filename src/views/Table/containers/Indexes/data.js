export default [
  {
    fields: 'id',
    name: {
      name: 'Id',
      type: 'Primary',
    },
  },
  {
    fields: 'user_id',
    name: {
      name: 'User',
      type: 'Internal',
    },
  },
  {
    fields: 'body, title',
    name: {
      name: 'Content',
      type: 'External',
    }
  }
]
