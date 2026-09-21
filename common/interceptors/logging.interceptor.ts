import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const { method, url, query, body } = request;

        const requestTimestamp = new Date().toISOString();

        const requestLog: Record<string, any> = {
            method,
            url,
            timestamp: requestTimestamp,
        };

        if(method === 'GET') {
            requestLog.query = query;
        }

        if(['POST', 'DELETE', 'PUT'].includes(method)) {
            requestLog.body = body;
        }

        this.logger.log(`[REQUEST] ${JSON.stringify(requestLog)}`);

        return next.handle().pipe(
            tap((responseBody) => {
                const responseLog = {
                    method,
                    url,
                    timestamp: new Date().toISOString(),
                    statusCode: response.statusCode,
                    ...(responseBody !== undefined && { body: responseBody} )
                };

                this.logger.log(`[RESPONSE] ${JSON.stringify(responseLog)}`);
            })
        );
    }
}