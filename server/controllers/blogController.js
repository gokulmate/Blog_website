const Blog = require ('../models/Blog');


// Get all blog
exports.getAllBlog = async (req,res)=>{
    try {
const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status (200).json({
            success:true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    };
};

//get by single blog ID
exports.getAllBlogId =async (req,res)=>{
    try {
        const blog =await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                success:false,
                message:'blog not found'
            });
        }
        res.status(200).json({
            success:true,
            data:blog
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
};


//create new blog
exports.createBlog = async(req,res)=>{
    try {
        const {title,description, auther,image} =req.body;
        console.log(req.body);
        // Validation 
        if (!title || !description){
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

const newBlog = await Blog.create({
    title,
    description,
    auther:auther || 'Anonnymous',
      image: image || 'https://via.placeholder.com/300x200?text=Blog+Image'
});
res.status(201).json({
    success:true,
    message:'Blog created successfully',
    data :newBlog
});
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }
};


//update blog
exports.updateBlog =async (req,res)=>{
    try{
        const {title,description, auther,image} = req.body;
        let blog= await Blog.findById(req.params.id);
        if (!blog){
            return res.status(404).json({
                success:false,
                message: 'bolg not found'
            });
        }

      const updateBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {title,description,auther,image},
            {new:true, runValidation:true}
              );
              res.status(200).json({
                success:true,
                message:'Blog updated successfully',
                data:blog
              });


    }catch(error){
res.status(400).json({
    success:false,
    message:error.message
});
    }
};


// delete blog
exports.deleteBlog = async (req,res)=>{
    try {
       const blog=  await Blog.findByIdAndDelete(req.params.id);
console.log("ID =", req.params.id);
       if (!blog){

    return res.status(404).json({
        success:false,
        message: 'blog not found'
    });
}
 res.status(200).json ({
    success:true,
    message:'blog deleted successfully'
 });


    } catch (error) {
 res.status(500).json({
success: false,
message:error.message
 });      
    }
};
