import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://discrete-redbird-57951.upstash.io',
  token: 'AeJfAAIjcDE2NDk1NDExNmQxYjk0Mjg3OGQwMGE2YzE3ZWY1ZGRlY3AxMA',
})

export default redis;