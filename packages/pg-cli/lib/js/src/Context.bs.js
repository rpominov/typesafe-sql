// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


function quiet(ctx) {
  if (ctx.argv.quiet) {
    return true;
  } else {
    return ctx.config.quiet === true;
  }
}

exports.quiet = quiet;
/* No side effect */