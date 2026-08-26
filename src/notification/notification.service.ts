import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { from, of } from 'rxjs';
import { catchError, map, mergeMap, retry, toArray } from 'rxjs/operators';
import * as crypto from 'crypto';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(private readonly httpService: HttpService) {}

    sendPushNotification(UserIds: string[], postTitle: string): void {
        const pushServerUrl = process.env.PUSH_SERVER_URL || 'http://localhost:8090/api/push';
        const message = `새로운 게시글이 등록되었습니다: ${postTitle}`;

        const notificationStream$ = from(UserIds).pipe(
            mergeMap((userId) => {
                const randomDeviceId = crypto.randomUUID();

                return this.httpService.post(pushServerUrl, {
                    deviceId: randomDeviceId,
                    message: message,
                }).pipe(
                    map((response) => {
                        if(response.data.resultCode === -1) {
                            throw new Error(`Server Internal Error (User: ${userId}`);
                        }
                        return response.data;
                    }),

                    retry(3),

                    catchError((error) => {
                        this.logger.error(`[푸시 실패] 유저 ${userId}에게 알림 발송 실패: ${error.message}`);
                        return of(null);
                    })
                );
            }, 10),

            toArray()
        );

        notificationStream$.subscribe({
            next: (results) => {
                const successCount = results.filter((res) => res !== null).length;
                this.logger.log(`알림 : 총 ${UserIds.length}명 중 ${successCount}명 성공`);
            },
            error: (err) => {
                this.logger.error(`알림 오류 발생 : ${err.message}`);
            }
        })
    }
}