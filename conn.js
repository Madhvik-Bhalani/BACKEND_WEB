const mongoose=require('mongoose')

const con=async()=>{
    try {
      await mongoose.connect("mongodb://localhost:27017/backend")
      console.log('connection successfull..');
    } catch (e) {
        console.log(`connection error ${e}`);
        
    }
}

con()