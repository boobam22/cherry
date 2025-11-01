import { Hono } from 'hono'
import { fromHono, D1CreateEndpoint, D1DeleteEndpoint, D1ListEndpoint, D1UpdateEndpoint, type MetaInput } from 'chanfana'
import { Obj, Str, Num, Enumeration } from 'chanfana'

const RowSchema = Obj({
  id: Num(),
  pid: Num().default(1),
  name: Str().min(3).max(12),
  catalog: Enumeration({ values: ['outlook', 'gmail', 'xyz'], enumCaseSensitive: false }),
  description: Str().default(''),
})

function getMeta(fields?: MetaInput['fields']): MetaInput {
  return { model: { schema: RowSchema, tableName: 't_emails', primaryKeys: ['id'] }, fields }
}

const openapi = fromHono(new Hono())

openapi.get(
  '/',
  class ListEmail extends D1ListEndpoint {
    _meta = getMeta()
    filterFields = ['catalog']
    searchFields = ['name']
  },
)

openapi.post(
  '/',
  class CreateEmail extends D1CreateEndpoint {
    _meta = getMeta(RowSchema.omit({ id: true }))
  },
)

openapi.patch(
  '/',
  class UpdateEmail extends D1UpdateEndpoint {
    _meta = getMeta(RowSchema.omit({ name: true, catalog: true }))
  },
)

openapi.delete(
  '/',
  class DeleteEmail extends D1DeleteEndpoint {
    _meta = getMeta()
  },
)

export default openapi
