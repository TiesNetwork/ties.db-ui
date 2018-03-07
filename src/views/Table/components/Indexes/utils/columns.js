import React from 'react';

/** Actions **/
import { fetchIndex } from '../../../ducks/actions';

/** Components **/
import { DataFetcher, Fields, Name } from 'components/Table/index';

export default [
  {
    accessor: 'data',
    Cell: ({ value }) => <DataFetcher {...value} onFetch={fetchIndex} />,
    maxWidth: 0,
    sortable: false,
    style: { padding: 0 },
  },
  {
    accessor: 'name',
    Cell: ({ value }) => <Name {...value} />,
    id: 'name',
    Header: 'Name',
    sortable: false,
  },
  {
    accessor: 'fields',
    Cell: ({ value }) => <Fields items={value} />,
    id: 'fields',
    Header: 'Fields',
    sortable: false,
  },
]
