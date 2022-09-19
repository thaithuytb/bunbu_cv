import { Params, Query } from 'express-serve-static-core';
import RequestType from '../src/types/requestType';

export default function mockRequest({
  payloadBody,
  params,
  query,
  userId,
  email,
  headers,
}: {
  payloadBody?: any;
  params?: Params;
  query?: Query;
  userId?: number;
  email?: string;
  headers?: any;
}): RequestType {
  return {
    body: payloadBody || {},
    params: params || {},
    query: query || {},
    userId: userId || undefined,
    email: email || undefined,
    headers: headers,
  } as RequestType;
}
