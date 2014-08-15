'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var config = {
    app: 'app',
    dist: 'dist'
  };
  
  grunt.initConfig({
    
    config: config,
    
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      chrome: {
        options: {
            open: false,
            base: [
                '<%= config.app %>'
            ]
        }
      },
      test: {
        options: {
          open: false,
          base: [
              'test',
              '<%= config.app %>'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: ['**']
        }]
      }
    },

    compress: {
      dist: {
        options: {
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/ato-ichinen-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: ''
        }]
      }
    },

    qunit: {
      files: ['test/index.html']
    }

  });

  grunt.registerTask('test', [
    'connect:test',
    'qunit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'compress'
  ]);

};