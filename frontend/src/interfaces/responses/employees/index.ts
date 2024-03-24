import { IEmployee } from "@/interfaces/entities/employees";
import { IBaseResponse } from "..";

export interface IEmployeeDetailmData extends IEmployee {
    identity_card_url: string;
}

export interface IEmployeeIndexResponse extends IBaseResponse<IEmployee[]> {}
export interface IEmployeeShowResponse
    extends IBaseResponse<IEmployeeDetailmData> {}
export interface IEmployeeDefaultValueFormResponse
    extends IBaseResponse<IEmployeeDetailmData> {}
