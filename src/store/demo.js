export default {
  entities: {
    fields: {
      'a53873351790b54a8958346fecd94900c91a10656bcb5382a3f976026b7d444d': {
        defaultValue: '0',
        id: 'a53873351790b54a8958346fecd94900c91a10656bcb5382a3f976026b7d444d',
        name: 'id',
        type: 'integer',
      },
      '4d63844af524ebe4a671eafb666a8b5ba9f033c491ef7b81121f737cfba51bd0': {
        defaultValue: '0',
        id: '4d63844af524ebe4a671eafb666a8b5ba9f033c491ef7b81121f737cfba51bd0',
        name: 'date',
        type: 'integer',
      },
      'f6c27851c0f5e908879042d595d7f8b864148db4b8ce5aaee1f954d347bef2ba': {
        defaultValue: '0',
        id: 'f6c27851c0f5e908879042d595d7f8b864148db4b8ce5aaee1f954d347bef2ba',
        name: 'user_id',
        type: 'integer',
      },
      '13f3be3ceec502069c21144ce9f7a0d3f2e0df78036a174ce3fe3c6318f303d2': {
        defaultValue: '0',
        id: '13f3be3ceec502069c21144ce9f7a0d3f2e0df78036a174ce3fe3c6318f303d2',
        name: 'title',
        type: 'string',
      },
      'e345dd1bba36460833d27dee82b7322d656dde58d5212f2a67f369e7bcfe123e': {
        defaultValue: '"Message"',
        id: 'e345dd1bba36460833d27dee82b7322d656dde58d5212f2a67f369e7bcfe123e',
        name: 'body',
        type: 'string',
      },
    },
    indexes: {
      'cd8a8e664a100c4fa235801eed5639885bd99d3cab1051804ca97def78a2a7fe': {
        id: 'cd8a8e664a100c4fa235801eed5639885bd99d3cab1051804ca97def78a2a7fe',
        fields: 'id',
        name: 'Id',
        type: 'Primary',
      },
      '7a2e9b489b5411c95a98504c73ce1c5c15185968abf05c9afa22195478204d01': {
        id: '7a2e9b489b5411c95a98504c73ce1c5c15185968abf05c9afa22195478204d01',
        fields: 'user_id',
        name: 'User',
        type: 'internal'
      },
      '5901435c89f928a49bae68040dc63f465baa32111b0fc039f106a8d2b6327b7f': {
        id: '5901435c89f928a49bae68040dc63f465baa32111b0fc039f106a8d2b6327b7f',
        fields: 'title, body',
        name: 'Content',
        type: 'external',
      },
    },
    tables: {
      '07606c0f587b7d974c23d9e4e5775051d2ae9415d70e3715f8e52355068dbde5': {
        id: '07606c0f587b7d974c23d9e4e5775051d2ae9415d70e3715f8e52355068dbde5',
        name: 'Invoices',
        fields: [],
        indexes: [],
        triggers: [],
      },
      '02e113f81f01ccad7cb542beaafe6042879e086598ba64dd8f958fcd2e4fa764': {
        id: '02e113f81f01ccad7cb542beaafe6042879e086598ba64dd8f958fcd2e4fa764',
        name: 'Messages',
        fields: [
          'a53873351790b54a8958346fecd94900c91a10656bcb5382a3f976026b7d444d',
          '4d63844af524ebe4a671eafb666a8b5ba9f033c491ef7b81121f737cfba51bd0',
          'f6c27851c0f5e908879042d595d7f8b864148db4b8ce5aaee1f954d347bef2ba',
          '13f3be3ceec502069c21144ce9f7a0d3f2e0df78036a174ce3fe3c6318f303d2',
          'e345dd1bba36460833d27dee82b7322d656dde58d5212f2a67f369e7bcfe123e',
        ],
        indexes: [
          'cd8a8e664a100c4fa235801eed5639885bd99d3cab1051804ca97def78a2a7fe',
          '7a2e9b489b5411c95a98504c73ce1c5c15185968abf05c9afa22195478204d01',
          '5901435c89f928a49bae68040dc63f465baa32111b0fc039f106a8d2b6327b7f',
        ],
        triggers: [
          'a8f43ca2590f893815e15c7bf6484df4b7ecef2390bfe642ef49064153282150',
        ],
      },
      '64bcd53c88025148ec20129a5c47f96ba7f9bb86d472c546132e5f5ad23450bd': {
        id: '64bcd53c88025148ec20129a5c47f96ba7f9bb86d472c546132e5f5ad23450bd',
        name: 'Users',
        fields: [],
        indexes: [],
        triggers: [],
      },
    },
    tablespaces: {
      '533600ae43797e80056159ee920464dab921cc1aa742f4b6f02e6502e53f55b5': {
        id: '533600ae43797e80056159ee920464dab921cc1aa742f4b6f02e6502e53f55b5',
        name: 'Ties.DB',
        tables: [
          '07606c0f587b7d974c23d9e4e5775051d2ae9415d70e3715f8e52355068dbde5',
          '02e113f81f01ccad7cb542beaafe6042879e086598ba64dd8f958fcd2e4fa764',
          '64bcd53c88025148ec20129a5c47f96ba7f9bb86d472c546132e5f5ad23450bd',
        ],
      },
    },
    triggers: {
      'a8f43ca2590f893815e15c7bf6484df4b7ecef2390bfe642ef49064153282150': {
        id: 'a8f43ca2590f893815e15c7bf6484df4b7ecef2390bfe642ef49064153282150',
        name: 'New message',
        payload: '89 50 4e 47 0d 0a 1a 0a  00 00 00 0d 49 48 44 52',
      },
    },
  },
  views: {
    dashboard: {
      tablespaces: ['533600ae43797e80056159ee920464dab921cc1aa742f4b6f02e6502e53f55b5']
    }
  }
}


// _.times(20, () => _.random(35).toString(36)).join('');
