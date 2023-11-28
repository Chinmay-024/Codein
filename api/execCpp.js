const Docker = require("dockerode");
const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const docker = new Docker();
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

async function executeCpp(codeFilePath, inputpath) {
  const codeId = path.basename(codeFilePath).split(".")[0];
  const outPath = path.join(outputPath, `${codeId}.out`);

  let executionOutput = null;
  let language = "cpp";
  let container;

  try {
    if (language === "cpp") {
      container = await docker.createContainer({
        Image: "g-image",
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
      });
    }
console.log("Running");
    await container.start();

    const containerInfo = await container.inspect();
    if (!containerInfo.State.Running) {
      throw new Error("Container is not running");
    }
    if (language === "cpp") {
      const copyCodeCommand = `docker cp ${codeFilePath} ${container.id}:/app/1.cpp`;
      await exec(copyCodeCommand);

      const compileCommand = `docker exec ${container.id} g++ /app/1.cpp -o /app/1`;
      const { stdout: compileOutput, stderr: compileError } = await exec(
        compileCommand
      );

      if (compileError) {
        throw new Error(`Compilation Error: ${compileError}`);
      }

      const runCommand = `docker exec ${container.id} timeout 5s /app/1`;
      const { stdout: execOutput, stderr: executionError } = await exec(
        runCommand
      );

      if (executionError) {
        throw new Error(`Execution Error: ${executionError}`);
      }

      executionOutput = execOutput;
    }
  } catch (error) {
    throw error;
  } finally {
    setTimeout(async () => {
      try {
        if (container) {
          await container.stop();
          await container.remove();
        }
      } catch (cleanupError) {
        console.error("Cleanup Error:", cleanupError);
      }
    }, 10);
  }

  return executionOutput;
}

module.exports = {
  executeCpp,
};
