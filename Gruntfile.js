var webpack = require("webpack");
module.exports = function(grunt) {
	"use strict";
	//任务配置，所以插件的配置信息
	grunt.initConfig({

		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),

		//uglify插件的配置信息
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd")%>'
			},
			build: {
				src: 'src/index.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},

		//js校验插件的配置信息
		jshint: {
			build: ['Gruntfile.js', 'src/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		//watch自动监控插件的配置信息
		watch: {
			build: {
				files: ['src/*.js', 'src/*.css'],
				tasks: ['jshint', 'uglify'],
				option: {
					spawn: false,
					livereload: true
				}
			}

		},

		//当文件改变时，重新启动服务器
		nodemon: {
			dev: {
				script: "server/app.js",
				options: {
					args: [],
					nodeArgs: ['--debug'],
					ignore: ['node_modules/**'],
					ext: 'js',
					watch: ['./'],
					delay: 1000,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},

		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	console.log(__dirname);

	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('build', function() {
		var html = grunt.file.read("./src/index.html");
		grunt.file.write("./src/index.html", html);
	});
	//告诉grunt当我们在终端输入grunt时需要做什么
	grunt.registerTask('crud', ['concurrent', 'build']);

};