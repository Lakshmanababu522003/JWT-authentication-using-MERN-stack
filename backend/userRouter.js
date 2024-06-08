const router = require('express').Router();
const User = require('./userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(404).json("Email already exists");
        }

        console.log(req.body);

        const password = req.body.password;
        if (!password) {
            return res.status(400).json("Missing password");
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });

        const data = await user.save();

        res.json(data);
    } catch (err) {
        // Handle the error appropriately
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

router.post('/login',async (req,res) =>{
    try {
        const userData = await User.findOne({ email: req.body.email });
        if (!userData) {
            return res.status(404).json("Email not exists");
        }

        var validPsw = await bcrypt.compare(req.body.password,userData.password);

        if(!validPsw){
            return res.status(404).json("password not valid");
        }

        var userToken = await jwt.sign({ email:userData.email},"ragasiyam");

        res.header('auth',userToken).send(userToken);
        
    } catch (err) {
        // Handle the error appropriately
        console.error(err);
        res.status(500).json("Internal Server Error");
        
    }
});

const validUser = (req,res,next) => {
    var token = req.header('auth');
    req.token =token;
    next();
}

router.get('/getAll',validUser,async(req,res) => {
    jwt.verify(req.token,"ragasiyam",async(err,data) =>{
        if(err){
            res.sendStatus(403);
        }
        else{
            const data =await User.find().select(['-password']);
            res.json(data);
        }
    })
    
})

module.exports = router;
