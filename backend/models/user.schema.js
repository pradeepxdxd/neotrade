const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        // required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    verifytoken: {
        type: String
    },
    walletinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet'
    }

});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
})

userSchema.methods.generateUserToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY, { expiresIn: '2h' });
        this.tokens = this.tokens.concat({ token })
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('User', userSchema);