import { Params, Query } from 'express-serve-static-core';
import RequestType from '../src/types/requestType';

export default function mockRequest({
  payloadBody,
  params,
  query,
  headers,
  user,
  email,
  user_id,
  file,
}: {
  payloadBody?: any;
  params?: Params;
  query?: Query;
  headers?: any;
  user?: any;
  email?: string;
  user_id?: number;
  file?: any;
}): RequestType {
  return {
    body: payloadBody || {},
    params: params || {},
    query: query || {},
    headers: headers || {},
    user: user || {},
    email: email || undefined,
    user_id: user_id || undefined,
    file: file || {
      path: '/abc/abc',
      mimetype: 'image/png',
    },
  } as RequestType;
}
