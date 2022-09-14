import { Params, Query } from 'express-serve-static-core';
import RequestType from '../src/types/requestType';

export default function mockRequest({
  payloadBody,
  params,
  query,
  headers,
  user,
}: {
  payloadBody?: any;
  params?: Params;
  query?: Query;
  headers?: any;
  user?: any;
}): RequestType {
  return {
    body: payloadBody || {},
    params: params || {},
    query: query || {},
    headers: headers || {},
    user: user || {},
  } as RequestType;
}
