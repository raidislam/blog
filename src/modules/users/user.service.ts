import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { RegiserUserPayload } from "./user.interface";


const createUserIntoDB = async (payload: RegiserUserPayload) => {
  const { name, email, password, profilePhoto } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bycryptSaltRounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile:{
        create: {
          title: name,
          profilePhoto,
        }
      }
    },
  });

  // await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     title: name,
  //     profilePhoto,
  //   },
  // });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export const userService = {
  createUserIntoDB,
};
