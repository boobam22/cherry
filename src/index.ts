import { Hono } from 'hono'
import { fromHono } from 'chanfana'

import qwe from './qwe'
import email from './email'

const app = new Hono()
const openapi = fromHono(app, { docs_url: '/' })

openapi.route('/qwe', qwe)
openapi.route('/email', email)

export default app
