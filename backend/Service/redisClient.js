import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://free-dinosaur-24969.upstash.io',
  token: 'AWGJAAIjcDExNzcwODVhMTI0NDA0ZGE1ODE4MTUxMjg3YzgwMzhkZnAxMA',
})

export default redis;