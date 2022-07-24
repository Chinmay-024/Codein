const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputpath) => {
    const codeId = path.basename(filepath).split(".")[0];
    const outPath = outputPath;

    return new Promise(async (resolve, reject) => {
        if (inputpath === undefined) {
            exec(
                `javac -d ${outPath} ${filepath} && timeout 20s java -cp ${outPath} Main`,
                (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    resolve(stdout);
                }
            );
        } else {
            exec(
                `javac -d ${outPath} ${filepath} && timeout 20s java -cp ${outPath} Main < ${inputpath}`,
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
    executeJava,
};
