module.exports = function (req, res, next) {
  let end = res.end.bind(res)

  res.end = function (chunk) {
    let html = chunk.toString("utf8")
    if (/<\/body>/.test(html)) {
      html = html.replace(
        /<\/body>/,
        `
	    <style>
	    </style>
	    <script>
	    var tokenElement = document.createElement('div')
	    tokenElement.className = 'toolbar-button';
	    tokenElement.style="max-width: 1000px; vertical-align: middle; padding: 0px 1px 0px 8px; height: 27px; line-height: 27px;"
	    tokenElement.innerHTML = '<span>token</span><input style="vertical-align: middle; display: inline-block; background: white; border: 0; margin-left: 5px; line-height: 24px; padding: 0; padding-left: 6px; border-left: 1px solid #adadad;" id="token">'

	    document.querySelector('.topBar').appendChild(tokenElement)

	    fetch = new Proxy(fetch, {
	      apply(target, ctx, args) {
			let value = document.getElementById('token').value
			  if(/^{/.test(value)) {
				try {
					value = JSON.parse(value)
				} catch(e) {
					value = {Authorization: value}
				}
			  } else {
				value = {Authorization: value}
			  }
	      	

	      	for(let key in value) {
	      		args[1].headers[key] = value[key]
	      	}
	        return target(...args)
	      }
	    });
	    </script>
	    </body>
	  `
      )
    }

    chunk = Buffer.from(html)
    res.setHeader("Content-Length", String(chunk.length))
    end(chunk)
  }
  next()
}
