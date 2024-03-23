export interface IBaseResponse<T> {
    status: string;
    message: string;
    data: T;
}
