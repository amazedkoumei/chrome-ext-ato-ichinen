/*!
 * statusManager JavaScript Library v0.1
 *
 * Copyright (c) 2012 amazedkoumei (Twitter: @amazedkoumei, Blog:http://blog.amazedkoumei.com)
 * Licensed under the MIT license + "keep this comment block even if you modify it".
 *
 * History:
 *  05-06-2012 new created
 */
var statusManager = $({});
statusManager.status = false;

$.extend(statusManager, {
  getStatus: function() {
    return statusManager.status;
  },
  changeStatus: function() {
    statusManager.status = !statusManager.status;
  }
});