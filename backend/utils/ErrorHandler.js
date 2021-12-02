//

let {v4: uuid} = require("uuid");

class BaseError extends Error {

    constructor({title, titleKey, titleKeyParameters, metadata, errors, statusCode = 400}) {
        super();

        this.statusCode = statusCode;
        this.data = {
            title,
            titleKey,
            instance: uuid(),
            timestamp: new Date().toISOString(),
            errors
        };
        if (titleKeyParameters) {
            this.data["titleKeyParameters"] = titleKeyParameters;
        }
        if (metadata) {
            this.data["metadata"] = metadata;
        }
    }
}

class ValidationError extends BaseError {

    constructor({titleKeyParameters, metadata, errors, statusCode = 422}) {
        super({
            title: "Validation Errors",
            titleKey: 'errors.validation',
            titleKeyParameters,
            metadata,
            errors,
            statusCode
        })
    }
}

class NotFoundError extends BaseError {
    constructor({detail, detailKey, titleKeyParameters, metadata, errors, statusCode = 404}) {
        super({
            title: "Not Found Errors",
            titleKey: 'errors.resource.missing',
            titleKeyParameters,
            metadata,
            errors,
            statusCode
        });
        this.detail = detail;
        this.detailKey = detailKey
    }
}

class BusinessError extends BaseError {
    constructor({titleKeyParameters, metadata, errors, statusCode = 500}) {
        super({
            title: "Business Errors",
            titleKey: 'errors.business',
            titleKeyParameters,
            metadata,
            errors,
            statusCode
        })
    }
}

class BadRequest extends BaseError {
    constructor({titleKeyParameters, metadata, errors, statusCode = 400}) {
        super({
            title: "Bad Request Errors",
            titleKey: 'errors.bad.request',
            titleKeyParameters,
            metadata,
            errors,
            statusCode
        })
    }
}

class UnauthorizedError extends BaseError {
    constructor({titleKeyParameters, metadata, errors, statusCode = 401}) {
        super({
            title: "Unauthorized Errors",
            titleKey: 'errors.unauthorized',
            titleKeyParameters,
            metadata,
            errors,
            statusCode
        })
    }
}

class SystemError extends BaseError {
    constructor({titleKeyParameters, metadata, errors, statusCode = 401}) {
        super({
            title: "System Errors",
            titleKey: 'errors.system',
            titleKeyParameters,
            metadata,
            errors,
            statusCode
        })
    }
}

class ErrorObject {

    constructor({detail, detailKey, detailKeyParameters, fields, status, index, metadata}) {
        this.detail = detail;
        this.detailKey = detailKey;
        if (detailKeyParameters) this.detailKeyParameters = detailKeyParameters;
        if (fields) this.fields = fields;
        if (status) this.status = status;
        if (index) this.index = index;
        if (metadata) this.metadata = metadata;
    }
}

global["BaseError"] = BaseError;
global["ErrorObject"] = ErrorObject;
global["ValidationError"] = ValidationError;
global["NotFoundError"] = NotFoundError;
global["BusinessError"] = BusinessError;
global["BadRequest"] = BadRequest;
global["SystemError"] = SystemError;
global["UnauthorizedError"] = UnauthorizedError;