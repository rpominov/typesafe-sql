let build = (ctx: Context.t) => {
  let sources = switch ctx.argv.input {
  | None => ctx.config.sources
  | Some(glob) => Some([{input: [glob], output: ctx.argv.output}])
  }

  Js.log(sources)
}

let watch = ctx => ctx->TTY.info("TODO: watch")

let pipe = ctx => ctx->TTY.info("TODO: pipe")
