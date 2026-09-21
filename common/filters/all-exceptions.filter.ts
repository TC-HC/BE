import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

        const timestamp = new Date().toISOString();

        const errorLog = {
            method: request.method,
            url: request.url,
            statusCode: status,
            timestamp,
            errorMessage: exception instanceof Error ? exception.message : String(exception)
        };

        if(status >= 500) {
            this.logger.error(
                `[${errorLog.method}] ${errorLog.url} - ${status} - ${JSON.stringify(errorLog.errorMessage)}`,
            );
        } else {
            this.logger.warn(
                `[${errorLog.method}] ${errorLog.url} - ${status} - ${JSON.stringify(errorLog.errorMessage)}`,
            );
        }

        response.status(status).json({
            statusCode: status,
            message,
            path: request.url,
            timestamp
        });
    }
}