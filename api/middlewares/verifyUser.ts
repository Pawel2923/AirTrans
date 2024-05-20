import { NextFunction, Request, Response } from "express";
import { Err } from "../Types";
import jwt from "jsonwebtoken";

// Extend Request interface to include user property
declare global {
	namespace Express {
		interface Request {
			user?: string | object | undefined;
		}
	}
}

export function verifyUser(req: Request, _res: Response, next: NextFunction) {
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
			(
				err: jwt.VerifyErrors | null,
				user: string | object | undefined
			) => {
				if (err) {
					const error = new Err("Forbidden", 403);
					return next(error);
				}

				req.user = user;
				return next();
			}
		);
	} else if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(
			token,
			process.env.SECRET_TOKEN as string,
			(
				err: jwt.VerifyErrors | null,
				user: string | object | undefined
			) => {
				if (err) {
					const error = new Err("Forbidden", 403);
					return next(error);
				}

				req.user = user;
				return next();
			}
		);
	}
}

export function requireRole(req: Request, requiredRole: string) {
	const role = requiredRole;

		if (!role) {
			return;
		}
	
		const user = req.user as { role: string };
	
		if (user.role !== role) {
			throw new Err("Forbidden", 403);
		}
}
