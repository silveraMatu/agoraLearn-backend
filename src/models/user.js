import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcrypt";

const User = sequelize.define("user",{
    username:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            len: [3, 100],
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            is: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z0-9]{2,}$/i
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            is: /^(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
        }
    }
},{
    hooks:{
        beforeCreate: async(user)=>{
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
        },
        beforeUpdate: async(user)=>{
            if(user.changed("password")){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

export default User;