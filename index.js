var chai = require('chai');
chai.config.includeStack = true;
var should = chai.should();
var expect = chai.expect;

function compare (value, format, cb) {
  if(typeof format == 'string' && typeof value == 'string') {
    if(/^\/.*\/([img])*?$/.test(format)) {
      var result = /^\/(.*)\/(([img])+)?$/.exec(format);
      var exp = new RegExp(result[1], result[2]);
      expect(exp.test(value),
      'Object  does not match to ' +
      format + ' regular expression!').to.equal(true);
    }
    else expect(value).to.equal(format);
  }
  else if(typeof format == 'object' && typeof value == 'object') {
    for(var key in format) {
      expect(value).to.have.property(key);
      try {
        compare(value[key], format[key]);
      }
      catch(err) {
        if(err) {
         throw new ComppassException(key,err);
       }
      }
    }
  }
  else if(Array.isArray(format) && Array.isArray(value)) {
    for(var index in format){
      try {
        compare(value[index], format[index]);
      }
      catch(err) {
        if(err) {
         throw new ComppassException(index, err);
       }
      }
    }
  }
  else {
    expect(value).to.equal(format);
  }
}

function ComppassException(key, err) {
   this.value = key;
   this.message = '{ ' + key + ' : ' + err + ' }';
   this.toString = function() {
      return this.message;
   };
}

module.exports = compare;
