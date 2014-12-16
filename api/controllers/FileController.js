// ListScrubber/api/controllers/FileController.js
var csv = require('fast-csv');
var fs = require('fs');

module.exports = {

    index: function (req,res){

        res.writeHead(200, {'content-type': 'text/html'});
        res.end(
                '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
                '<input type="text" name="title"><br>'+
                '<input type="file" name="avatar" multiple="multiple"><br>'+
                '<input type="submit" value="Upload">'+
                '</form>'
        );
    },
    uploadA: function  (req, res) {
        req.file('emailcsv').upload(function (err, files) {
            if (err)
                return res.serverError(err);

            var stream = fs.createReadStream(files[0].fd);
            var emails = [];

            var csvStream = csv()
                .on("data", function(data){
                    console.log(data);
                    emails.push(data[0]);
                })
                .on("end", function(){
                    console.log("done");
                    sails.config.cache.personA = emails;
                });

            stream.pipe(csvStream);

            return res.json({
                message: files.length + ' file(s) uploaded successfully!',
                files: files

            });
        });
    },
    uploadB: function  (req, res) {
      req.file('emailcsv').upload(function (err, files) {
        if (err)
          return res.serverError(err);

        var stream = fs.createReadStream(files[0].fd);
        var emails = [];

        var csvStream = csv()
          .on("data", function(data){
            console.log(data);
            emails.push(data[0]);
          })
          .on("end", function(){
            console.log("done");
            sails.config.cache.personB = emails;
          });

        stream.pipe(csvStream);

        return res.json({
          message: files.length + ' file(s) uploaded successfully!',
          files: files

        });
      });
    },
    getPeople: function(req, res) {
      res.send({
        data: sails.config.cache
      });
    },
    getDuplicates: function(req, res){
      var result = _.difference(sails.config.cache.personA, sails.config.cache.personB);
      res.send({
        data: result
      });

    }



};
