import { mockPostRequest } from '@/data/test'
import { mockAxios } from '@/infra/test'
import axios, { type AxiosResponse } from 'axios'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient<Record<string, unknown>, unknown>
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient<Record<string, unknown>, unknown>()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post.mock.calls).toEqual([[request.url, request.body]])
  })

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.post(mockPostRequest())
    const mockedAxiosResult = await (
      mockedAxios.post.mock.results[0].value as Promise<AxiosResponse<unknown>>
    )

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
