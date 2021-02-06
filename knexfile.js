// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/app.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      }
    }
  },

  development_pg: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    migrations: {
        directory: './data/migrations',
    },
    seeds: {
        directory: './data/production/seeds',
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/testing/app-testing.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/testing/seeds'
    }
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: `${process.env.DATABASE_URL}?sslmode=require`,
    migrations: {
        directory: __dirname + '/data/migrations',
    },
    seeds: {
        directory: __dirname + '/data/production/seeds',
    },
  },
};
