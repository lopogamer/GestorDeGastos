import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function customErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error.validation) {
    const messageParts = error.message.split(' ');
    if (messageParts.length > 1) {
      messageParts.shift();
      error.message = messageParts.join(' ');
    }
  }
  reply.status(error.statusCode || 500).send({
    error: error.name,
    message: error.message,
    statusCode: error.statusCode || 500,
  });
}
