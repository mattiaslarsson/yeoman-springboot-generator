var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
};

module.exports = class extends Generator {
  async promptingForProjectName() {
    this.answers = await this.prompt([
      {
        type : 'input',
        name : 'springbootversion',
        message : 'Spring Boot starter parent version'
      },
      {
        type : 'input',
        name : 'groupId',
        message : 'groupId'
      },
      {
        type : 'input',
        name : 'artifactId',
        message : 'artifactId'
      },
      {
        type : 'input',
        name : 'version',
        message : 'version',
        default : '1.0'
      }
    ]);

  }

  writePom() {
    this.log(this.answers.artifactId);
    this.fs.copyTpl(
      this.templatePath('pom.xml'),
      this.destinationPath('pom.xml'),
      {springbootversion: this.answers.springbootversion,
      groupId: this.answers.groupId,
      projectname: this.answers.artifactId,
      version: this.answers.version
      }
    );
  }

  writeMainClass() {
    this.fs.copyTpl(
      this.templatePath('Application.java'),
      this.destinationPath('src/main/java/' + this.answers.groupId + '/Application.java'),
      {}
    );
  }

  writePingController() {
    this.fs.copyTpl(
      this.templatePath('PingController.java'),
      this.destinationPath('src/main/java/' + this.answers.groupId + '/rest/PingController.java'),
      {}
    );
  }
};

