export default {
  entities: {
    fields: {
      'v1mfmgtvdl1vzadx8yty': {
        defaultValue: '0',
        id: 'v1mfmgtvdl1vzadx8yty',
        name: 'id',
        type: 'integer',
      },
      'up64aw4fzxl89ppg6w9j': {
        defaultValue: '0',
        id: 'up64aw4fzxl89ppg6w9j',
        name: 'date',
        type: 'integer',
      },
      't9iyv1hf0lq29mmlspzw': {
        defaultValue: '0',
        id: 't9iyv1hf0lq29mmlspzw',
        name: 'user_id',
        type: 'integer',
      },
      'a2l1eug9hkjxxad9msc7': {
        defaultValue: '0',
        id: 'a2l1eug9hkjxxad9msc7',
        name: 'title',
        type: 'string',
      },
      'ar2cuo7nd60gmr2ew3s6': {
        defaultValue: '"Message"',
        id: 'ar2cuo7nd60gmr2ew3s6',
        name: 'body',
        type: 'string',
      },
    },
    tables: {
      '4mjqfehdzfspj9lr4req': {
        id: '4mjqfehdzfspj9lr4req',
        name: 'Invoices',
      },
      '8a74voz31rxqxk59hsox': {
        id: '8a74voz31rxqxk59hsox',
        name: 'Messages',
        fields: [
          'v1mfmgtvdl1vzadx8yty',
          'up64aw4fzxl89ppg6w9j',
          't9iyv1hf0lq29mmlspzw',
          'a2l1eug9hkjxxad9msc7',
          'ar2cuo7nd60gmr2ew3s6',
        ],
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
