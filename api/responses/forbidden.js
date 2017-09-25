/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden(data, options) {
  // Get access to `req`, `res`, & `sails`
  const req = this.req;
  const res = this.res;
  const sails = req._sails;
  let data1 = data;
  let options1 = options;

  // Set status code
  res.status(403);

  // Log error to console
  if(data1 !== undefined) {
    sails.log.verbose('Sending 403 ("Forbidden") response: \n', data1);
  } else sails.log.verbose('Sending 403 ("Forbidden") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if(sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data1 = undefined;
  }

  // If the user-agent wants JSON, always respond with JSON
  // If views are disabled, revert to json
  if(req.wantsJSON || sails.config.hooks.views === false) {
    return res.jsonx(data1);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options1 = (typeof options1 === 'string') ? { view: options1 } : options1 || {};

  // Attempt to prettify data for views, if it's a non-error object
  let viewData = data1;
  if(!(viewData instanceof Error) && typeof viewData === 'object') {
    try {
      viewData = require('util').inspect(data1, {depth: null});
    } catch(e) {
      viewData = undefined;
    }
  }

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if(options1.view) {
    return res.view(options1.view, { data: viewData, title: 'Forbidden' });
  }

  // If no second argument provided, try to serve the default view,
  // but fall back to sending JSON(P) if any errors occur.
  return res.view('403', { data: viewData, title: 'Forbidden' }, (err, html) => {
    // If a view error occured, fall back to JSON(P).
    if(err) {
      //
      // Additionally:
      // • If the view was missing, ignore the error but provide a verbose log.
      if(err.code === 'E_VIEW_FAILED') {
        sails.log.verbose('res.forbidden() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
      } else {
        // Otherwise, if this was a more serious error, log to the console with the details.
        sails.log.warn('res.forbidden() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
      }
      return res.jsonx(data1);
    }

    return res.send(html);
  });
};

