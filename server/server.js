const express= require ('express');
const mongoose=require('mongoose');
const cors = require ('cors');
require('dotenv').config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb connectuion 
mongoose.connect (process.env.MONGODB_URI)
.then(()=> console.log('mongoDB Connected'))
.catch(err => console.log('mongoDB error:',err));


//routes
const blogRoutes =require('./routes/blogRoutes');
console.log("blogRoutes =",blogRoutes)
app.use('/api/blogs',blogRoutes);

// Home Route
app.get('/',(req, res)=>{
res.json({message:'BLog Api is running'});

})

//start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});