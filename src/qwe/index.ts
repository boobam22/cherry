import { Hono, type Context } from 'hono'
import { fromHono, OpenAPIRoute, contentJson, Obj, Str } from 'chanfana'

import encode from './encode'

const openapi = fromHono(new Hono())

openapi.get(
  '/',
  class extends OpenAPIRoute {
    schema = {
      request: { query: Obj({ text: Str().min(3).max(12).default('hello') }) },
      responses: {
        '200': {
          description: '',
          ...contentJson(Obj({ output1: Str().length(14), output2: Str().length(13) })),
        },
      },
    }
    async handle(ctx: Context) {
      const data = await this.getValidatedData<typeof this.schema>()
      return Response.json(encode(data.query.text))
    }
  },
)

export default openapi
