import { IEmployee } from "@/interfaces/entities/employees";
import { IBaseResponse } from "..";

export interface IEmployeeIndexResponse extends IBaseResponse<IEmployee[]> {}
export interface IEmployeeShowResponse extends IBaseResponse<IEmployee> {}
export interface IEmployeeDefaultValueFormResponse
    extends IBaseResponse<IEmployee> {}
