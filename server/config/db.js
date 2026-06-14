const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // process.env se URI uthayega, agar nahi mila toh local use karega
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Error: ${error.message}`);
        
        // Agar connection fail hua toh server ko stop kar do
        process.exit(1);
    }
};

module.exports = connectDB;
