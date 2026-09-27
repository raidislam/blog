import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await userService.createUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created successfully",
      data: { result },
    });
    // res.status(httpStatus.CREATED).json({
    //   success: true,
    //   message: "User created successfully",
    //   data: {
    //     result,
    //   },
    // });
  },
);



// const createUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const result = await userService.createUserIntoDB(payload);
//     res.status(httpStatus.CREATED).json({
//       success: true,
//       message: "User created successfully",
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message: "Failed to create user",
//       error,
//     });
//   }
// };

export const userController = {
  createUser,
};
