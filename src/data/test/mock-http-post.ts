import { faker } from '@faker-js/faker'
import type { HttpPostParams } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<Record<string, unknown>> => ({
  url: faker.internet.url(),
  body: {
    value: faker.string.uuid()
  }
})
