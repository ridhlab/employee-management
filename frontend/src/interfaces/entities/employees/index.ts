import { ReligionEnum } from "@/enums/religion.enum";
import { IBaseEntity } from "..";

export interface IEmployee extends IBaseEntity {
    fullname: string;
    nip: string;
    year_birthdate: string;
    address: string;
    phone: string;
    religion: ReligionEnum;
    activate_status: boolean;
    identity_card_filename: string;
}
