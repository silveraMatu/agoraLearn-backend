import User from "../models/user.js";

export const createUser = async(req, res)=>{
    const { username, email, password } = req.body;
    try{
        const user = await User.create({ username, email, password });
        res.status(201).json({
            Message: "Usuario creado con exito!",
            id: user.id,
            username: user.username,
            email: user.email
        });
    }catch(e){
        res.status(500).json({Error: e.message});
    }
}
