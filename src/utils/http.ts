
class httpUtilityClass {

    public sendSuccess(httpStack, data): void {

        data = JSON.parse(JSON.stringify(data));

        httpStack.statusCode = httpStack.statusCode == undefined ? 200 : httpStack.statusCode;

        httpStack.res.status(httpStack.statusCode).send({
            message: httpStack.message == undefined ? "" : httpStack.message,
            status: true,
            data: data,
            trace: ""
        });
    }

    public sendError(httpStack, error): void {


        httpStack.statusCode = httpStack.statusCode == undefined ? 200 : httpStack.statusCode;

        httpStack.res.status(httpStack.statusCode).send({
            message: httpStack.message == undefined ? (error.message == undefined ? "SERVER ERROR" : error.message) : httpStack.message,
            status: false,
            data: [],
            trace: error.message == undefined ? error : error.message
        });

    }

    public action(req, res, next, action) {

        let httpStack = {
            req: req, res: res, next: next, message: "", statusCode: 200,
        };

        try {

            let requestJSON: any = { configSQL: {} };
            action(httpStack, requestJSON);
        } catch (error) {

            httpUtility.sendError(httpStack, error);
        }
    }


}

export const httpUtility = new httpUtilityClass();