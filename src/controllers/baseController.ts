import { IncomingMessage, ServerResponse } from "http";
import { JSON_CONTENT_TYPE } from "../constants/headers";
import { ResponseMessages } from "../constants/ResponseMessages";

export async function getUnsupportedMethod(req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.writeHead(405, JSON_CONTENT_TYPE);
  res.end(JSON.stringify({ message: ResponseMessages.UNSUPPORTED_HTTP_METHOD }));
}

export async function getNotFound(req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.writeHead(404, JSON_CONTENT_TYPE);
  res.end(JSON.stringify({ message: ResponseMessages.ROUTE_NOT_FOUND }));
}

export async function getServerError(req: IncomingMessage, res: ServerResponse): Promise<void> {
  res.writeHead(500, JSON_CONTENT_TYPE);
  res.end({ message: ResponseMessages.SERVER_ERROR });
}
