



export function ErrorHandler(error: any ){
    let code: number = 400;
    let description: String[] = [error];

    if(error.name == 'SequelizeUniqueConstraintError'){
        description.push(`${error.fields} already taken.`);
    }
    if(error.name == 'SequelizeValidationError'){
        description.push(`Email error`);
    }
    // TODO: add more error constraints
    return {
        code: code,
        description: description
    }

}