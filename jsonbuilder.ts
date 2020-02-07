

interface BaseBuilder{
    code: number;
    [description: string]: any;    
}


export const RegisterError: BaseBuilder= {
    code: 404,
    description: "Something went wrong"
}
