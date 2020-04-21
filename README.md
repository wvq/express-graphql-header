# express-graphql-token

Make graphiql send token from header 'Authorization'
or pass json string to set header

usage:

```javascript
import express from "express"
import graphqlHTTP from "express-graphql"
import graphqlToken from "express-graphql-token"

let app = express()
// ...
app.use(path, graphqlToken, graphqlHTTP(schema))
// ...
```

It will add a input element to graphiql html.

![](/images/screenshot.png)

If token is a json string, it will set each key headers[key] = jsonValue, or will set headers['Authorization'] = token
