"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = require("../users/user.model");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1];
            // check if token exists
            if (!token) {
                res.status(401).json('Not Authorized, No Token Available');
            }
            // verify token
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            // Get the user ID from the token payload
            let user = yield user_model_1.User.findById(decoded.id).select('-password');
            if (user)
                req.user = user;
            next();
        }
        catch (err) {
            // console.log(err);
            res.status(500).json('Internal Server Error');
        }
    }
});
exports.protect = protect;
