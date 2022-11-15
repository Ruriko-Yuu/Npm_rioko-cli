const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const logSymbols = require("log-symbols");
const templateList = require(`${__dirname}/../template`);
const { showTable } = require(`${__dirname}/../util/showTable`);
const download = require("download-git-repo");
var cmd = require("node-cmd");
const shell = require('shelljs');
const ora = require('ora');

const process = require("child_process");
let config = {
  projectName: null,
};

// spinner.start();//开始
function delDir(p) {
  // 读取文件夹中所有文件及文件夹
  var list = fs.readdirSync(p);
  list.forEach((v, i) => {
    // 拼接路径
    var url = p + "/" + v;
    // 读取文件信息
    var stats = fs.statSync(url);
    // 判断是文件还是文件夹
    if (stats.isFile()) {
      // 当前为文件，则删除文件
      fs.unlinkSync(url);
    } else {
      // 当前为文件夹，则递归调用自身
      arguments.callee(url);
    }
  });
  // 删除空文件夹
  fs.rmdirSync(p);
}

// 用于存储所有的交互步骤，例如让用户输入项目名称就是其中一个步骤
let promps = [
  {
    type: "input",
    name: "projectName",
    message: "请输入项目名称",
    validate: (input) => {
      if (!input) {
        return "项目名称不能为空";
      }
      config.projectName = input;
      return true;
    },
  },
  {
    name: "projectTemplate",
    message: "请选择框架",
    type: "list",
    choices: ["Vue-Webpack", "Qwik", "Vue-Vite", "React-Vite"],
  },
];

inquirer.prompt(promps).then(async (answers) => {
  console.log("answers", answers);
  //从git下载到本地指定路径
  const url = templateList.app;
  // download(`direct:${'https://gitee.com/breezedeus/cnstd'}#master`, answers.projectName, { clone: true }, (err) => {
  download(
    {
      'Vue-Vite': `direct:git@github.com:Ruriko-Yuu/Npm_rioko-cli.git#vue-vite`,
      'Vue-Webpack': `direct:git@github.com:Ruriko-Yuu/Npm_rioko-cli.git#vue-webpack`,
      'React-Vite': `direct:git@github.com:Ruriko-Yuu/Npm_rioko-cli.git#react-vite`,
      Qwik: `direct:git@github.com:Ruriko-Yuu/RiokoCli-Qwik.git#my-branch`
    }[answers.projectTemplate],
    answers.projectName,
    { clone: true },
    () => {
      if (fs.readdirSync(`./${answers.projectName}`).includes(".gitignore")) {
        if (fs.readdirSync(`./${answers.projectName}`).includes(".git")) {
          delDir(`./${answers.projectName}/.git`);
        }
        console.log(logSymbols.success, chalk.green("创建成功 开始下载依赖"));
        const spinner = ora('Loading unicorns').start();
        shell.exec(`cd ${answers.projectName} & yarn`, function(code, stdout, stderr) {
          setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = code | stdout | stderr;
          }, 1000);
          // console.log('Exit code:', code);
          // console.log('Program output:', stdout);
          // console.log('Program stderr:', stderr);
          if (code===0) {
              spinner.stop();//结束
              console.log("进入文件夹:", chalk.green(`cd ${answers.projectName}`));
              console.log("运行项目:", chalk.green(`yarn serve`));
          } else {
            console.log(chalk.red.bold("依赖安装失败!!!"));
            spinner.stop();//结束
          }
        });
      } else {
        console.log(chalk.red.bold("项目初始化失败!!!"));
      }
    }
  );
});

// fs.writeFile(
//   `${__dirname}/../template.json`,
//   JSON.stringify(templateList),
//   "utf-8",
//   (err) => {
//     if (err) console.log(chalk.red(symbols.error), chalk.red(err));
//     console.log("\n");
//     console.log(
//       chalk.green(symbols.success),
//       chalk.green("Add a template successfully!\n")
//     );
//     console.log(chalk.green("The latest templateList is: \n"));
//     showTable(templateList);
//   }
// );
