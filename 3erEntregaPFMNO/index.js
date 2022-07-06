const express = require('express')
const app = express();
const cluster = require('cluster');
const os = require('os');
const PORT = 8080;
const apiRoutes = require('./routers/index');

// Middleware
app.use(express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './views')
app.set('view engine', 'ejs')


if (cluster.isPrimary) {
    console.log(`I am the primary process with pid ${process.pid}!!`);
    const WORK_NUM = os.cpus().length;
    console.log(`Cores number => `, WORK_NUM);
    for (let i = 0; i < WORK_NUM; i++) {
        cluster.fork()
    };

    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died :(`);
        cluster.fork();
    });
} else {
    console.log(`I am a worker process with pid ${process.pid}!`);

    app.use('/api', apiRoutes);

    const server = app.listen(PORT, () => {
        console.log(`Server is up and running on http://localhost:${PORT}`);
    });

    server.on('error', error => console.log(error))

}