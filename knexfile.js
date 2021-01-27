// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/app.db3'
    },
    migrations: {
      directiory: './data/migrations'
    },
    seeds: {
      directiory: './data/seeds'
    }
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/app-testing.db3'
    },
    migrations: {
      directiory: './data/migrations'
    },
    seeds: {
      directiory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
