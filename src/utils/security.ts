import { httpUtility } from "./http";

var jwt = require('jsonwebtoken');


class securityUtilityClass {

    public cors(req, res, next) {

        // CORS headers
        res.header("Access-Control-Allow-Origin", "*");

        // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, UserID');

        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    }
    public generateToken(username) {
        const token = jwt.sign({ username: username }, process.env.API_JWT_SECRET);
        return token;
    }

    public validateToken(req, res, next): void {

        if (req.url.includes('/login')) {
            next();
            return;
        }
        if (req.url.includes('/sign-up')) {
            next();
            return;
        }

        let httpStack = {
            req: req, res: res, next: next, message: "", statusCode: 200,
        };

        let token = req.header('Authorization')

        if (token) {
            token = token.slice(7, token.length);

            jwt.verify(token, process.env.API_JWT_SECRET, function (err, decoded) {
                if (err) {
                    let response = { message: "Authorization token - Invalid" };
                    httpStack.statusCode = 401;
                    httpUtility.sendError(httpStack, response);
                } else {
                    next();
                    return;
                }
            });

        } else {
            let response = { message: "Authorization token - Not found" };
            httpStack.statusCode = 401;
            httpUtility.sendError(httpStack, response);
        }
    }
}

export const securityUtility = new securityUtilityClass();