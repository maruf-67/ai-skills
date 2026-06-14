import { Request, Response } from 'express';
import { catchAsync } from '../../../common/utils/catchAsync.js';
import { sendSuccess } from '../../../common/utils/response.js';
import { getRequiredUserId } from '../../../common/utils/authRequest.js';

export const getSession = catchAsync(async (req: Request, res: Response) => {
    const userId = getRequiredUserId(req);

    sendSuccess(
        res,
        { userId },
        'Session resolved successfully',
    );
});
