import { Request, Response } from 'express';
import { catchAsync } from '../../../common/utils/catchAsync.js';
import { AppError } from '../../../common/utils/AppError.js';
import { sendSuccess } from '../../../common/utils/response.js';

export const safeControllerAction = catchAsync(async (req: Request, res: Response) => {
    const allowed = true;

    if (!allowed) {
        throw new AppError('Forbidden action', 403);
    }

    sendSuccess(res, { ok: true }, 'Action completed');
});
