const fs = require('fs'),
      path = require('path');

module.exports = function multipath(pathString, ext) {
  ext = ext || ['.js', '.json'];

  try {
    var isDir = fs.lstatSync(pathString).isDirectory();
  } catch (err) {
    if (typeof ext === 'string') {
      // extension start with a dot
      if (ext.substr(0, 1) !== '.') ext = '.' + ext;

      var filename = pathString + ext;

      if (fs.lstatSync(filename).isFile()) return require(filename);
    }

    if (ext instanceof Array) {
      var filename = ext.filter(e => {
        try {
          if (fs.statSync(`${ pathString }${ e }`)) return `${ pathString }${ e }`;
        } catch (e) {
          return false;
        }
      });

      if (filename.length === 1) return require(`${ pathString }${ filename[0] }`);
    }

    throw new Error(`'${ pathString }' is not a directory or a file`);
  }

  const modules = {};

  fs.readdirSync(pathString).filter(file => file.indexOf('.') !== 0).forEach(file => {
    if (file.slice(-3) !== '.js') return;

    var namespace = (fname => {
      var splited = fname.toLowerCase().split(/[-_]/g),
          reponse = [];

      splited.forEach(w => reponse.push(w.charAt(0).toUpperCase() + w.slice(1)));

      return reponse.join('');
    })(file.slice(0, -3));

    modules[namespace] = require(path.join(pathString, file));
  });

  return modules;
};