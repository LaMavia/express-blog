"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema_1 = require("../../ShadowMS/classes/Schema");
/**
 * @type {mongoose.Schema}
 */
const NAVPAGE_SCHEMA = new mongoose.Schema({
    Name: String,
    Href: String
});
exports.default = new Schema_1.default("NavPage", NAVPAGE_SCHEMA, "nav-pages");
