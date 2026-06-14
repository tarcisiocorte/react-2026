import { faker } from '@faker-js/faker'
import type { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient<unknown, unknown> => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<Record<string, unknown>> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectValue({
    value: faker.string.uuid()
  })
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post.mock.calls).toEqual([[request.url]])
  })
})
