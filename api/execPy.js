const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filepath, inputpath) => {
    const codeId = path.basename(filepath).split(".")[0];

    return new Promise(async (resolve, reject) => {
        if (inputpath === undefined || inputpath === "") {
            exec(`timeout 5s python ${filepath}`, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        } else {
            console.log(inputpath);
            console.log(` python ${filepath} < ${inputpath}`);
            exec(
                `timeout 5s python ${filepath} < ${inputpath}`,
                (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    resolve(stdout);
                }
            );
        }
    });
};

module.exports = {
    executePy,
};
