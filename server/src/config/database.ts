import mongoose from 'mongoose';


export const connection = async () => {
    try{
        const db = mongoose.connect(`mongodb+srv://group5:qwertyuiop@empmanage.bdbqemp.mongodb.net/`)
        console.log(`Mongodb connected`)
    }catch(err){
        console.log(err)
    }
}