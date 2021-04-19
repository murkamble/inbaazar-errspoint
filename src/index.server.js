const express = require('express');
const env = require('dotenv');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
env.config();
app.use(express.json());
// app.use(bodyParser());
app.use(cors());

// mongoose Databases connection string
mongoose.connect(
    //'mongodb://localhost:27017/inbaazaar', 
    'mongodb+srv://root:root@cluster0.a0xhf.mongodb.net/inBaazaar?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Databases Connected...');
});

// app.use('/',(req,res)=>{
//     res.json({ message: 'Server Side ......' });
// });


// routes
const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');


// API
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});