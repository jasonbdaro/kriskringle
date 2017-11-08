import jwt from 'jsonwebtoken'

export const SECRET = 'B6A2S3H5';

export function generateToken(req) {	
	return jwt.sign({
		auth: new Date().getTime(),
		agent: req,
		exp: Math.floor(new Date().getTime()/1000) + 7*24*60*60
	}, SECRET)
}

export function verifyToken(token) {
	try {
		return jwt.verify(token, SECRET)
	} catch (e) {
		return false
	}
	return false
}