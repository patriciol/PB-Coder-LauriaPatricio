const path = require('path');
const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');
const compression = require('compression')
const log4js = require('log4js')

const router = express.Router();
const { generateArray } = require('../utils/index');
const Contenedor = require("../contenedor");
const mensajes = new Contenedor('./mensajes.txt')
const parseArgs = require('minimist')
const { fork } = require('child_process');
const { info } = require('console');


//log
log4js.configure({
  appenders: {
    console: { type: "console" },
    infoFile: { type: 'file', filename: 'info.log' },
    warningFile: { type: 'file', filename: 'warn.log' },
    errorFile: { type: 'file', filename: 'error.log' }
  },
  categories: {
    default: { appenders: ["console"], level: "trace" },
    console: { appenders: ["console"], level: "debug" },
    infoFile: { appenders: ["infoFile"], level: "info" },
    warningFile: { appenders: ["warningFile"], level: "warn" },
    error: { appenders: ["console", "errorFile"], level: "error" }
  }
})

const logger = log4js.getLogger();
const consoleLogger = log4js.getLogger('console');
const infoLogger = log4js.getLogger('infoFile');
const warnLogger = log4js.getLogger('warningFile');
const errorLogger = log4js.getLogger('error');



//Routes
router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
  const user = await req.user;
  if (user) {
    const arrayMensajes = await mensajes.getAll()

    const arrayProd = await generateArray(5)
    return res.render('profile', { user, arrayMensajes, arrayProd })

  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});

router.get('/profile', auth, async (req, res) => {
  const user = await req.user.email;
  const arrayMensajes = await mensajes.getAll()
  const arrayProd = await generateArray(5)
  return res.render('profile', { user, arrayMensajes, arrayProd })
});

router.get('/logout', auth, (req, res, next) => {
  req.logOut();
  console.log('User logued out!');
  res.redirect('/');
});

router.get('/login-error', async (req, res) => {
  const error = 'USER ERROR LOGIN'
  return res.render('error', { error })
})

router.get('/register-error', async (req, res) => {
  const error = 'USER ERROR SINGUP'
  return res.render('error', { error })
})

router.get('/infoConLog', async (req, res) => {

  infoLogger.info("GET=> /info")

  const objeto = {
    'directorio': process.cwd(),
    'processid': process.pid,
    'version': process.version,
    'so': process.platform,
    'memoria': process.memoryUsage().rss,
    'path': process.execPath,
    'entrada': process.argv
  }
  console.log(objeto)
  return res.render('info', { objeto })

})

router.get('/infoSinLog', async (req, res) => {

  infoLogger.info("GET=> /info")

  const objeto = {
    'directorio': process.cwd(),
    'processid': process.pid,
    'version': process.version,
    'so': process.platform,
    'memoria': process.memoryUsage().rss,
    'path': process.execPath,
    'entrada': process.argv
  }

  return res.render('info', { objeto })

})

router.get('/infogzip', compression(), async (req, res) => {

  const objeto = {
    'directorio': process.cwd(),
    'processid': process.pid,
    'version': process.version,
    'so': process.platform,
    'memoria': process.memoryUsage().rss,
    'path': process.execPath,
    'entrada': process.argv
  }


  return res.render('info', { objeto })

})

router.get('/*', compression(), async (req, res) => {

  warnLogger.warn("Ruta no implementada")

})

/*router.get('/api/randoms', async (req, res) => {
  let { cant } = req.query
  const forked = fork('./computo.js')


  if (typeof cant === 'undefined') {
    cant = 100000000
  }

  forked.send(cant)

  forked.on('message', objeto => {
    objeto = JSON.stringify(objeto)
    res.end(objeto)
  })
})
*/


module.exports = router;