export default {
  entities: {
    tables: {
      '4mjqfehdzfspj9lr4req': {
        id: '4mjqfehdzfspj9lr4req',
        name: 'Invoices',
      },
      '8a74voz31rxqxk59hsox': {
        id: '8a74voz31rxqxk59hsox',
        name: 'Messages',
      },
      '2r79ap16icko8id95w5k': {
        id: '2r79ap16icko8id95w5k',
        name: 'Users',
      },
    },
    tablespaces: {
      '3c903f2vl78is7kgh3z6': {
        id: '3c903f2vl78is7kgh3z6',
        name: 'Ties.DB',
        tables: [
          '4mjqfehdzfspj9lr4req',
          '8a74voz31rxqxk59hsox',
          '2r79ap16icko8id95w5k',
        ],
      },
      '72na7ib254mievutjanq': {
        id: '72na7ib254mievutjanq',
        name: 'Krawlly',
      }
    }
  },
  views: {
    dashboard: {
      tablespaces: ['3c903f2vl78is7kgh3z6', `72na7ib254mievutjanq`]
    }
  }
}


// _.times(20, () => _.random(35).toString(36)).join('');
