const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)

const io = require('socket.io')(server,{
  cors: {
   origin: "https://restaurant-demo-amber.vercel.app", //specific origin you want to give access to,
   methods : ['GET', 'POST', 'PUT' , ' UPDATE', 'DELETE'],

},
})

io.on('connect', socket=>{
  console.log(socket)
  console.log('connect open')
})

const cors = require('cors');
const dotenv = require('dotenv');


const cookieParser = require('cookie-parser')
const connectdb = require('./database/connectdb.js');



const routecategory = require('./router/Category.router.js');
const routeproduct = require('./router/Product.router.js');
const routeuser = require('./router/User.router.js');
const routetable = require('./router/Table.router.js');
const routeorder = require('./router/Order.router.js');
const routeauth = require('./router/Auth.router.js');
const routestockitems = require('./router/StockItem.router.js');
const routestockmanag = require('./router/StockMang.router.js');


dotenv.config();
connectdb();


app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin : 'https://restaurant-demo-amber.vercel.app',
  methods : ['GET', 'POST', 'PUT' , ' UPDATE', 'DELETE'],
  credentials: true 
}));
app.use(cookieParser());
app.use(express.json());
app.use('/',express.static("public"));

app.get('/',(req, res) => {
    res.send('beshoy')
})
// app.get('/',(req, res) => {
//     return res.render("index.html")
// })


// app.get('/', function (req, res) {
//     // Cookies that have not been signed
//     console.log('Cookies: ', req.cookies)
  
//     // Cookies that have been signed
//     console.log('Signed Cookies: ', req.signedCookies)
//   })


//ROUTER
app.use('/api/product', routeproduct)
app.use('/api/category', routecategory);
app.use('/api/user', routeuser);
app.use('/api/table', routetable );
app.use('/api/order', routeorder);
app.use('/api/auth', routeauth);
app.use('/api/stockitem', routestockitems);
app.use('/api/stockmanag', routestockmanag);



//open server

const port = process.env.PORT|| 8000;

server.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});