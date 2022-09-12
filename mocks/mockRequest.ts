import { Request } from 'express';
import { Params, Query } from 'express-serve-static-core';

export default function mockRequest({
  payloadBody,
  params,
  query,
}: {
  payloadBody?: any;
  params?: Params;
  query?: Query;
}): Request {
  return {
    body: payloadBody || {},
    params: params || {},
    query: query || {},
  } as Request;
}
