import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log("Conexión exitosa a la DB")
} catch (error) {
    console.log('Error de conexion a MongoDB:' + error)
}
