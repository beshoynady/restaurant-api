const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http')
const server = http.createServer(app);

const socketio = require('socket.io')

const io = socketio(server);


io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});



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
  methods : ['GET', 'POST', 'PUT', 'UPDATE', 'DELETE'],
  credentials: true 
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://restaurant-demo-amber.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET', 'POST', 'PUT', 'UPDATE', 'DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use(cookieParser());
app.use(express.json());
app.use('/',express.static("public"));

app.get('/',(req, res) => {
    res.send('beshoy')
})

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