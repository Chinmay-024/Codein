const Queue = require("bull");

const Task = require("./models/taskModel");
const { executeCpp } = require("./execCpp");
const { executePy } = require("./execPy");
const { executeC } = require("./execC");
const { executeJava } = require("./execJava");
const { executeJS } = require("./execJS");

const taskQueue = new Queue("task-runner-queue");
const NUM_WORKERS = 10;

taskQueue.process(NUM_WORKERS, async ({ data }) => {
  const taskId = data.id;
  const task = await Task.findById(taskId);
  if (task === undefined) {
    throw Error(`cannot find Task with id ${taskId}`);
  }
  try {
    let output;
    task["startedAt"] = new Date();
    if (task.language === "cpp") {
      output = await executeCpp(task.filepath, task.inputpath);
    } else if (task.language === "py") {
 console.log("python");     
output = await executePy(task.filepath, task.inputpath);
    } else if (task.language === "c") {
      output = await executeC(task.filepath, task.inputpath);
    } else if (task.language === "java") {
      output = await executeJava(task.filepath, task.inputpath);
    } else if (task.language === "js") {
      output = await executeJS(task.filepath, task.inputpath);
    }
    task["completedAt"] = new Date();
    task["output"] = output;
    task["status"] = "success";
    await task.save();
    return true;
  } catch (err) {
    task["completedAt"] = new Date();
    task["output"] = JSON.stringify(err);
    task["status"] = "error";
    await task.save();
    throw Error(JSON.stringify(err));
  }
});

taskQueue.on("failed", (error) => {
  console.error(error.data.id, error.failedReason);
});

const addTaskToQueue = async (taskId) => {
  taskQueue.add({
    id: taskId,
  });
};

module.exports = {
  addTaskToQueue,
};
