"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema_1 = require("../../ShadowMS/classes/Schema");
const USER_SCHEMA = new mongoose.Schema({
    Login: String,
    Password: String,
    Email: String,
    Name: String,
    Desc: String,
    BirthDate: String,
    Img: String,
    Background: String,
    Type: String // User / Admin
});
exports.default = new Schema_1.default("User", USER_SCHEMA, "users");
// { data: Buffer, contentType: String }
