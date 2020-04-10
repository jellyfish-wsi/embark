const db = require('connect.js').connection();

/* TABLE FOR TRIPS */

const seed_data_trip = [
  { name: 'California', start_date: '03-11-2020', return_date: '07-20-2020', transport_mode: 'air' },
  { name: 'Wuhan', start_date: '03-11-2020', return_date: '07-20-2020', transport_mode: 'air' },
  { name: 'Italy', start_date: '03-11-2020', return_date: '07-20-2020', transport_mode: 'air' },
  { name: 'Toronto', start_date: '03-11-2020', return_date: '07-20-2020', transport_mode: 'air' },
  { name: 'Philadelphia', start_date: '03-11-2020', return_date: '07-20-2020', transport_mode: 'air' },
  { name: 'Bora Bora', start_date: '03-11-2020', return_date: '07-20-2020', transport_mode: 'air' },
];

db.serialize(() => {
  let drop_table_trip = `DROP TABLE IF EXISTS trips`;
  db.run(drop_table_trip, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  let create_table_trip = `CREATE TABLE trips
  ( id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    start_date DATE,
    return_date DATE,
    transport_mode VARCHAR(50)
  )`;
  db.run(create_table_trip, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let statement_trip = db.prepare(`INSERT INTO trips(name,start_date,return_date,transport_mode) VALUES (?,?,?,?)`);

  for (let d of seed_data_trip) {
    console.log("Values:",d.name,d.start_date,d.return_date,d.transport_mode);
    statement_trip.run(d.name,d.start_date,d.return_date,d.transport_mode);
  }
  statement_trip.finalize();
});

/* TABLE FOR USERS */

const seed_data_users = [
  { name: 'Oliver', email: 'olive@er.com'},
  { name: 'Deedee', email: 'hello@gmail.com'},
];

db.serialize(() => {
  let drop_table_users  = `DROP TABLE IF EXISTS users`;
  db.run(drop_table_users, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  let create_table_users = `CREATE TABLE users
  ( id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    email VARCHAR(50)
  )`;
  db.run(create_table_users, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let statement_users = db.prepare(`INSERT INTO users(name,email) VALUES (?,?)`);

  for (let d of seed_data_users) {
    console.log("Values:",d.name,d.email);
    statement_users.run(d.name,d.email);
  }
  statement_users.finalize();
});

/* TABLE FOR TRANSPORTATION */

const seed_data_transport = [
  { company_name: 'United Airlines', mode: 'air', status: 'on time'},
  { company_name: 'Amtrak', mode: 'rail', status: 'delayed'},
  { company_name: 'Greyhound', mode: 'road', status: 'cancelled'},
];

db.serialize(() => {
  let drop_table_transport  = `DROP TABLE IF EXISTS transport`;
  db.run(drop_table_transport, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  let create_table_transport = `CREATE TABLE transport
  ( id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name VARCHAR(50),
    mode VARCHAR(25),
    status VARCHAR(35)
  )`;
  db.run(create_table_transport, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let statement_transport = db.prepare(`INSERT INTO transport(company_name,mode,status) VALUES (?,?,?)`);

  for (let d of seed_data_transport) {
    console.log("Values:",d.company_name,d.mode,d.status);
    statement_transport.run(d.company_name,d.mode,d.status);
  }
  statement_transport.finalize();
});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Database connection closed');
});
