import User from "../models/model.user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const tambahuser = async (req, res) => {
    
    try {
        console.log(req.body);
        const { username, password } = req.body;
        //hash pass
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username: username, password:hashedPassword });
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const login = await User.findAll({
            where: {
                username: username
            }
        });
        if (login.length === 0) return res.status(404).send("User");
        const user = login[0];
        // verifikasi pass
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");
        // generate token
        const token = jwt.sign({ id: user.id }, "1234214123123sadasdw", {
          expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        res.json({ message: error.message });
    }
};