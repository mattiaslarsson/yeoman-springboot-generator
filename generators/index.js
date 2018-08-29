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
        type : 'list',
        name : 'springbootversion',
        message : 'Spring Boot starter parent version',
	    choices: [
		    "1.5.15.RELEASE",
		    "2.0.4.RELEASE"
	    ]
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

  writeApplicationProperties() {
    this.fs.copyTpl(
        this.templatePath('application.properties'),
        this.destinationPath('src/main/resources/application.properties')
    )
  }

  writeMainClass() {
    this.fs.copyTpl(
      this.templatePath('Application.java'),
      this.destinationPath('src/main/java/' + this.answers.groupId + '/Application.java'),
      {groupId: this.answers.groupId}
    );
  }

  writePingController() {
    this.fs.copyTpl(
      this.templatePath('PingController.java'),
      this.destinationPath('src/main/java/' + this.answers.groupId + '/rest/PingController.java'),
      {groupId: this.answers.groupId}
    );
  }

  writeApplicationTest() {
    this.fs.copyTpl(
        this.templatePath('test/ApplicationTest.java'),
        this.destinationPath('src/test/java/' + this.answers.groupId + '/ApplicationTest.java'),
        {groupId: this.answers.groupId}
    )
  }

  writePingTest() {
    this.fs.copyTpl(
        this.templatePath('test/PingControllerTest.java'),
        this.destinationPath('src/test/java/' + this.answers.groupId + '/rest/PingControllerTest.java'),
        {groupId: this.answers.groupId}
    )
  }
};

