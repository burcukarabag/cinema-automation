class SuccessMessage {

    constructor({name, message, statusCode = 200, id}){
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.id = id
    }

}

// class SuccessInsertMessage extends SuccessMessage {
//
//     constructor({name, message}){
//         super({
//             name: name,
//             message: message
//         });
//     }
//
// }

global['SuccessMessage'] = SuccessMessage;