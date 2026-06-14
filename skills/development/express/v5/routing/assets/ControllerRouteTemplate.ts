import { Router } from 'express';
import { authenticateToken } from '../../../common/middlewares/authMiddleware.js';
import { authorizeRoles } from '../../../common/middlewares/authorizeRoles.js';
import { validateRequest } from '../../../common/middlewares/validateRequest.js';
import { catchAsync } from '../../../common/utils/catchAsync.js';
import { sendSuccess } from '../../../common/utils/response.js';
import { getRequiredUserId } from '../../../common/utils/authRequest.js';
import { AppError } from '../../../common/utils/AppError.js';

const router = Router();

router.get(
    '/:id',
    authenticateToken,
    authorizeRoles('admin', 'user'),
    validateRequest(/* zod schema */),
    catchAsync(async (req, res) => {
        const userId = getRequiredUserId(req);
        const entity = await Promise.resolve({ id: req.params.id, userId });

        if (!entity) throw new AppError('Entity not found', 404);

        sendSuccess(res, entity, 'Entity fetched successfully');
    }),
);

export default router;
