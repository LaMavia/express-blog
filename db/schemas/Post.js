"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema_1 = require("../../ShadowMS/classes/Schema");
const POST_SCHEMA = new mongoose.Schema({
    Title: String,
    Tags: [String],
    Desc: String,
    Img: String,
    Body: String,
    Author: String,
    Date: String
});
exports.default = new Schema_1.default("Post", POST_SCHEMA, "posts");
