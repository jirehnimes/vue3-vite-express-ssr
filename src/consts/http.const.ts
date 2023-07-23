// eslint-disable-next-line @typescript-eslint/naming-convention
export enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum HTTP_STATUS {
  // Successful
  OK = 200,
  CREATED = 201,
  // Client error
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  TOKEN_EXPIRE = 419,
  // Server error
  INTERNAL_SERVER_ERROR = 500,
}

export enum HEADERS {
  ACCEPT = 'Accept',
  AUTHORIZATION = 'Authorization',
  CONTENT_TYPE = 'Content-Type',
}

export const AUTHORIZATION_BASIC_KEY = 'Basic';
export const AUTHORIZATION_BEARER_KEY = 'Bearer';
export const CONTENT_TYPE_JSON = 'application/json';
export const CONTENT_TYPE_JSON_UTF8 = 'application/json; charset=utf-8';
export const CONTENT_TYPE_FORM_DATA = 'multipart/form-data';
export const CONTENT_TYPE_FORM_URLENCODED = 'application/x-www-form-urlencoded';
