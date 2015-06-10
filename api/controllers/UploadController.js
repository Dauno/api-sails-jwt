/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
  var fs = require('fs');

module.exports = {

  uploadImage: function(req, res) {
    var params = req.params.all();
    var number = params.number || '';
    var image = params.image || '';

    if (!number || !image) {
      return res.json(401, {success:false, message: 'number and image required'});
    }
    Image.create({number: number, image: image}).exec(function(err, image) {
      if (err) {
        return res.json(401, {success:false, message: err});
      }
      if (image) {
        var imageBuffer = sailsBase64Image.decode(image.image);
        var rand = (Math.random()* 100 + 1);
        var nameImage = 'image-' + rand + '.jpg';
        fs.writeFile('./assets/images/' + nameImage, imageBuffer.data, function(err) {
          if(err) {
            return res.json(401, {success:false, message: err});
          } else {
            return res.json({success:true, message: 'The file was saved!'});
            console.log("The file was saved!");
          }
        });
      }
    });
  },
  images: function(req, res) {

    Image.find(function(err, images) {
        if (err) {
          return res.json(401, {success:false, message: err});
        }else{
          return res.json({success:true, images: images});
        }
    });
    // Image.find().done(function(err, images) {
    //     if (err) {
    //       return res.json(401, {success:false, message: err});
    //     };
    //     if (images) {
    //       return res.json({success:true, images: images.toJSON()});
    //     };
    // });


    // Image.find({enabled: true}, function(err, images) {
    //   if (err) {
    //   }
    //   if (images) {
    //     return res.json({success:true, images: images.toJSON()});
    //   };

    // });
    // Image.find({enabled: true}).exec(function(err, images) {
    //   if (err) {
    //     return res.json(401, {success:false, message: err});
    //   }
    //   if (images) {
    //     return res.json({success:true, images: images.toJSON()});
    //   };
    // });
  }
};

