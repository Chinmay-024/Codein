const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJS = (filepath, inputpath) => {
    const codeId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${codeId}.out`);

    return new Promise(async (resolve, reject) => {
        if (inputpath === undefined || inputpath === undefined) {
            exec(`node ${filepath}`, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        } else {
            console.log(inputpath);
            console.log(`timeout 3s node ${filepath} < ${inputpath}`);
            exec(`node ${filepath} < ${inputpath}`, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                resolve(stdout);
            });
        }
    });
};

module.exports = {
    executeJS,
};
