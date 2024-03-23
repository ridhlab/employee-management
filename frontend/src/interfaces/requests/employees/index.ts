import { ReligionEnum } from "@/enums/religion.enum";

export interface IStoreUpdateEmployeeRequest {
    fullname: string;
    nip: string;
    year_birthdate: number;
    address: string;
    phone: string;
    religion: ReligionEnum;
}

export interface ISetActiveInactiveRequest {
    ids: number[];
}
