import { faker } from '@faker-js/faker'
import type { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: {
    value: faker.string.uuid()
  },
  status: faker.number.int()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient<unknown, unknown> => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<Record<string, unknown>> => ({
  url: faker.internet.url(),
  body: {
    value: faker.string.uuid()
  }
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post.mock.calls).toEqual([[request.url, request.body]])
  })

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut()

    const httpResponse = await sut.post(mockPostRequest())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
