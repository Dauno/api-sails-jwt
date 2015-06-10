module.exports = {

  login: function(req, res) {
    var params = req.params.all();
    var username = params.username || '';
    var password = params.password || '';

    if (!username || !password) {
      return res.json(401, {success:false, message: 'username and password required'});
    }
    User.findOne({username: username}).exec(function(err, user) {
      if(err) {
        return res.json(401, {success:false, message: err});
      }
      if (user == undefined) {
        return res.json(401, {success:false, message: 'User undefined'});
      }
      else {
        User.validPassword(password, user, function(err, isMatch) {
          if (!isMatch) {
            return res.json(401, {success:false, message: 'Error password'});
          }else {
            return res.json({success:true, user: user.toJSON(), token: sailsTokenAuth.issueToken({sid: user.id})});
          }
        });
      }
    });
  }
  // register: function(req, res) {
  //   //TODO: Do some validation on the input
  //   if (req.body.password !== req.body.confirmPassword) {
  //     return res.json(401, {err: 'Password doesn\'t match'});
  //   }

  //   User.create({username: req.body.username, password: req.body.password}).exec(function(err, user) {
  //     if (err) {
  //       res.json(err.status, {err: err});
  //       return;
  //     }
  //     if (user) {
  //       res.json({user: user, token: sailsTokenAuth.issueToken({sid: user.id})});
  //     }
  //   });
  // }
};
