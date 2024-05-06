import { NextFunction, Request, Response } from "express";
import { Err } from "../Types";
import jwt from "jsonwebtoken";

export function verifyUser(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies.jwt;
	const authHeader = req.headers.authorization;

	if (!token && !authHeader) {
		const error = new Err("Unauthorized", 401);
		return next(error);
	}

	if (token) {
		jwt.verify(
			token,
			process.env.SECRET_TOKEN as string,
			(err: jwt.VerifyErrors | null, user: string | object | undefined) => {
				if (err) {
					const error = new Err("Unauthorized", 401);
					return next(error);
				}

				console.log(user);

				return next();
			}
		);
	} else if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(
			token,
			process.env.SECRET_TOKEN as string,
			(err: jwt.VerifyErrors | null, user: string | object | undefined) => {
				if (err) {
					const error = new Err("Unauthorized", 401);
					return next(error);
				}

				console.log(user);

				// req.user = user;
				return next();
			}
		);
	}
}
