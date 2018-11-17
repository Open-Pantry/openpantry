const Promise = require('bluebird');
const filecache = Promise.promisify(require('filecache'));

let cache;

function TemplateCache() {}

TemplateCache.prototype = {
  constructor: TemplateCache,
  loadTemplateCache: () => filecache('./models/email/templates').then((results) => {
    console.log('results of cache init:', results);
    cache = results;
    return Promise.resolve;
  }),
  getTemplate(name) {
    let template;
    switch (name) {
    case 'verification':
      template = cache['/emailVerification.html'].toString('ascii');
      break;
    default:
      var error = new Error('No such template');
      return error;
    } // switch
    return template;
  } // getTemplate
};

module.exports = TemplateCache;
