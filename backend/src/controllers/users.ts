import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  
  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }
    const user = await UserModel.findById(authenticatedUserId).select("+email").exec()
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password: passwordRaw } = req.body;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "All fields are required");
    }

    const existingUsername = await UserModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already exists");
    }

    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "Email already exists");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw createHttpError(400, "All fields are required");
    }

    const userMatch = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();
    if (!userMatch) {
      throw createHttpError(401, "Invalid username");
    }

    const passwordMatch = await bcrypt.compare(password, userMatch.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid password");
    }

    req.session.userId = userMatch._id;

    res.status(201).json(userMatch);
  } catch (error) {
    next(error);
  }
};
