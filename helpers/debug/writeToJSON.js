const fs = require("fs")
module.exports = data =>
	fs.writeFile(
		path.resolve(__dirname + "/DEV/log.json"),
		JSON.stringify(data),
		{ encoding: "utf-8" },
    err => err 
      ? console.error(err) 
      : console.info("Wrote output to a file")
	)
