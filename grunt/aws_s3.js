module.exports = {
    options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'us-west-2',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
    },
    production: {
      options: {
        bucket: 'www.sioblog.com',
        progress: 'progressBar'
      },
      files: [
        { expand: true, cwd: 'dist/', src: ['**'], dest: '/'} ,
      ]
    }
}
