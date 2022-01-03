export default interface User{
    id: number;
    email: string;
    password: string;

    //isValidPassword(passwordToCheck : string): Promise<Error | boolean>;
}