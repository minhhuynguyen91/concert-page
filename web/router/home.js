exports.index = function(req, res) {
  res.render('homes/index', {header: 'home'});
};

exports.contact = function(req, res) {
  res.render('homes/contact', {header: 'contact'});
};