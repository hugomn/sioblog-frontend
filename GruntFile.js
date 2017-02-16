module.exports = function(grunt) {
	var gtx = require('gruntfile-gtx').wrap(grunt),
		gruntConfig = require('./grunt');
    gtx.loadAuto();
    gruntConfig.package = require('./package.json');
	gruntConfig.aws = gtx.readJSON('./grunt/aws.json');
	gruntConfig.configDev = gtx.readJSON('./src/config/dev.json');
	gruntConfig.configProd = gtx.readJSON('./src/config/prod.json');
    gtx.config(gruntConfig);

    gtx.alias('build:dev', [
		'clean:dev',
		'recess:less',
		'recess:controllers',
		'ngconstant:dev',
		'copy:libs',
		'copy:src',
		'copy:dev',
		'recess:dev',
		'watch'
	]);

	gtx.alias('build:test', [
		'clean:dev',
		'recess:less',
		'recess:controllers',
		'ngconstant:dev',
		'copy:libs',
		'copy:src',
		'copy:dev',
		'recess:dev'
	]);

	gtx.alias('build:prod', [
		'clean:prod',
		'recess:less',
		'recess:controllers',
		'ngconstant:prod',
		'copy:libs',
		'copy:src',
		'copy:prod',
		'recess:prod',
		'concat',
		'uglify'
	]);

	gtx.alias('deploy:prod', ['build:prod', 'aws_s3:production']);
    gtx.alias('release', ['bower-install-simple', 'bump-commit']);
    gtx.alias('release-patch', ['bump-only:patch', 'release']);
    gtx.alias('release-minor', ['bump-only:minor', 'release']);
    gtx.alias('release-major', ['bump-only:major', 'release']);
    gtx.alias('prerelease', ['bump-only:prerelease', 'release']);

    gtx.finalise();
}
