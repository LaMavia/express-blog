"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
/**
 * @todo Add CMS routes \w handlers
 * @todo Rewrite app.js to ShadowMS app
 */
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sass = require("node-sass");
const sassMiddleware = require("node-sass-middleware");
const compression = require("compression");
class Shadow {
    constructor(port, dbConnection, dbSchemas, middleware, routes, APIRoutes, CatchHandler) {
        this.db = dbConnection;
        this.dbSchemas = dbSchemas;
        this.dbModels = {};
        this.port = port;
        this.middleware = middleware;
        this.routes = routes;
        this.APIRoutes = APIRoutes;
        this.host = "";
        this.data = {};
        this.CatchHandler = CatchHandler;
        this.app = express();
        this.Init(this.port);
    }
    InitMiddleware() {
        this.middleware.forEach((mdw) => {
            this.app.use(mdw);
        });
    }
    InitRoutes() {
        this.routes.forEach((route) => {
            this.app.use(route.path, route.handler(this.data));
        });
    }
    InitAPI() {
        this.APIRoutes.forEach((route) => {
            const handler = route.handler(this.dbModels);
            switch (route.method) {
                case "GET":
                    this.app.get(route.path, handler);
                    break;
                case "POST":
                    this.app.post(route.path, handler);
                    break;
                case "PUT":
                    this.app.put(route.path, handler);
                    break;
                case "DELETE":
                    this.app.delete(route.path, handler);
                    break;
                default:/* [*] */ 
                    ;
                    break;
            }
        }, this);
    }
    InitModels() {
        this.dbSchemas.forEach((schema) => {
            this.dbModels[schema.name] =
                this.db.model(schema.name, schema.schema, schema.collection);
        }, this);
    }
    Init(port) {
        this.app.set("views", path.join(__dirname, "..", "views"));
        this.app.set("view engine", "pug");
        dotenv.config();
        this.data.origin = process.env["HOST"];
        this.InitMiddleware();
        this.InitAPI();
        this.InitModels();
        this.UpdateData();
        this.InitRoutes();
        console.info("\x1b[36m%s\x1b[0m", " Ready for Action 👊");
    }
    // DataBase Methods
    GetFromDB(modelName, conditions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let out = null;
            yield this.dbModels[modelName].find(conditions)
                .then(d => out = d)
                .catch(err => new Error(err));
            return out;
        });
    }
    UpdateDB(modelName, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let output;
            yield this.dbModels[modelName].findOneAndUpdate(query, data)
                .then(res => output = res)
                .catch(err => output = err);
            return output;
        });
    }
    DeleteFromDB(modelName, query, single) {
        return __awaiter(this, void 0, void 0, function* () {
            let output;
            let operation;
            if (single)
                operation = this.dbModels[modelName].deleteOne.bind(this, query);
            else
                operation = this.dbModels[modelName].deleteMany.bind(this, query);
            yield operation()
                .then(res => output = res)
                .catch(err => output = err);
            return output;
        });
    }
    // Data Methods
    /**
     * @description Fetches data from data base and saves to ```this.data```
     */
    UpdateData(...modelNames) {
        return __awaiter(this, void 0, void 0, function* () {
            if (modelNames.length > 0) {
                yield modelNames.forEach((modelName) => __awaiter(this, void 0, void 0, function* () {
                    yield this.dbModels[modelName].find()
                        .then(res => this.data[modelName] = res)
                        .catch(this.CatchHandler);
                }), this);
            }
            else {
                for (const modelName in this.dbModels) {
                    yield this.dbModels[modelName].find()
                        .then(res => this.data[modelName] = res)
                        .catch(this.CatchHandler);
                }
            }
        });
    }
}
exports.default = Shadow;
/*for(let prop in Shadow.prototype.app.prototype) {
    // @ts-ignore
    Shadow.prototype[prop] =
        typeof Shadow.prototype.app.prototype[prop] === "function"
        ? Shadow.prototype.app.prototype[prop].bind(Shadow.prototype.app)
        : Shadow.prototype.app.prototype[prop]
}*/
// module.exports = Shadow
/**
 * Default middleware *
    favicon(path.join(__dirname, "public", "favicon.ico"))
    logger("dev")
    bodyParser.json()
    bodyParser.urlencoded({ extended: false })
    cookieParser()
    sassMiddleware({
        src: path.join(__dirname, "public/scss"),
        // file: 'style.scss',
        dest: path.join(__dirname, "public/css"),
        debug: true,
        outputStyle: process.env === "development" ? "expanded" : "compressed",
        prefix: "/css" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
    })
    express.static(path.join(__dirname, "public"))
    compression({
        filter: (req, res) => {
            return req.headers["x-no-compression"]
                ? false
                : compression.filter(req, res)
        }
    })
 */ 
