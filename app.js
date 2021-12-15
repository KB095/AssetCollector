const express               = require('express')
const dotenv                = require('dotenv')
const morgan                = require('morgan')
const exphbs                = require('express-handlebars')
const session               = require('express-session')

const { networkInterfaces } = require('os');
const path = require('path')


const app = express()

// Load Config:
    dotenv.config({path: './config.env'})

// CORS Policies:
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })

// Body Parser:
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

// Handlebars:
    app.engine(
        '.hbs',
        exphbs.engine({
            helpers: {},
            defaultLayout: 'main',
            extname: '.hbs'
        })
    )
    app.set('view engine', '.hbs')

// Static Folder:
    app.use(express.static(path.join(__dirname, 'public')))

// Routes
    app.use('/', require('./routes/index'))








// Logging:
    app.use(morgan('dev'))

// Find IP:
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    console.log(results)

const PORT = process.env.PORT || 3535
app.listen(PORT, console.log(`Server running @ http://${results['Wi-Fi'][0]}:${PORT}`))