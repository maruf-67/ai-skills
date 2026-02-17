import { getSocketIOInstance, sendNotificationToUser } from '../../../config/socketio.js';

export const emitDomainNotification = (userId: string, payload: Record<string, unknown>) => {
    const io = getSocketIOInstance();
    if (!io) return;

    sendNotificationToUser(io, userId, {
        type: 'DOMAIN_EVENT',
        ...payload,
    });
};
