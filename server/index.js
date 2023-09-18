const express = require('express');
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


dotenv.config();
connectdb();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin : process.env.FRONR_END,
  methods : ['GET', 'POST', 'PUT', ' UPDATE', 'DELETE'],
  credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
app.use('/',express.static("public"));


const port = process.env.PORT|| 8000;

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});

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



//open server
