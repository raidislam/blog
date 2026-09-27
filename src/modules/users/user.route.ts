import httpStatus from 'http-status';
import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userController } from './user.controller';

const router =  Router()


router.post("/register",userController.createUser)

export const userRoutes = router