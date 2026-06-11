import { HttpStatusCode } from '@/data/protocols/http'
import type { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {
  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    await axios(params.url)
    return {
      statusCode: HttpStatusCode.ok
    }
  }
}
