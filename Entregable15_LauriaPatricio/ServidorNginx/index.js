const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./middlewares/passport');
const minimist =require('minimist')

const env = require('./env.config');
const dbConfig = require('./db/config');
const apisRoutes = require('./routers/app.routers');

//const PORT = process.env.PORT || 8080;

const app = express();

//
const cluster = require('cluster');
const os =require('os');

const args = minimist(process.argv.slice(2), {
  default: {
    PORT: 8080,
    mode: "fork"
  },
  alias: {
    p: 'PORT',
    m: "mode"
  }
});

if (args.mode == "fork") { // el servidor se inicia en modo FORK.
  console.log(`The server is started in FORK mode with pid ${process.pid}`);

} else if (args.mode == "cluster") { // el servidor se inicia en modo CLUSTER.
  if (cluster.isPrimary) {
    console.log(`The server is started in CLUSTER mode with pid ${process.pid}`);
    const WORK_NUM = os.cpus().length;
    for (let i = 0; i < WORK_NUM; i++) {
      cluster.fork();
    };
    cluster.on("exit", (worker, code) => {
      console.log(`Worker ${worker.process.pid} exit`);
      cluster.fork();
    })
  } else {
    console.log(`I am a worker proces with pid ${process.pid}.`);
  }
} else throw new Error(`The modality entered [${args.mode}] is not supported.`);

//

// Middlewares
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'coder-session',
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConfig.mongodb.connectTo('entregable13')
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Template engines
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.use(apisRoutes);

app.listen(args.PORT, async () => {
  mongoose.connect(dbConfig.mongodb.connectTo('Entregable13'))
    .then(() => {
      console.log('Connected to DB!');
      console.log('Server is up and running on port: ', +args.PORT);
    });
});