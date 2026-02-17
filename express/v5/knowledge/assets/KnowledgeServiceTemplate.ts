import { AppError } from '../../../common/utils/AppError.js';

interface AccessContext {
    userId: string;
    role: string;
}

export const assertKnowledgeAccess = (
    ownerId: string,
    allowedUsers: string[],
    isPublic: boolean,
    ctx: AccessContext,
): void => {
    if (isPublic) return;

    const isOwner = ownerId === ctx.userId;
    const isAdmin = ctx.role === 'admin';
    const isAllowed = allowedUsers.includes(ctx.userId);

    if (!isOwner && !isAdmin && !isAllowed) {
        throw new AppError('Access denied', 403);
    }
};
