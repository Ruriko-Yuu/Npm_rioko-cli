#! /usr/bin/env node
const program = require("commander");
program
  .command("init")
  .alias("i")
  .description("初始化项目")
  .action((option) => {
    require("../commands/init");
  });
program.parse(process.argv);
