

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


    public validateToken(req, res, next): void {
        next();
        return;

    }
}

export const securityUtility = new securityUtilityClass();