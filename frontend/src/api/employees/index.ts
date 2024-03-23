import { ENDPOINT_API } from "@/constants/routes";
import { parsingRoute, routeWithParams } from "@/helpers/routes";
import { IStoreUpdateEmployeeRequest } from "@/interfaces/requests/employees";
import {
    IEmployeeDefaultValueFormResponse,
    IEmployeeIndexResponse,
    IEmployeeShowResponse,
} from "@/interfaces/responses/employees";
import { cacheConfig } from "@/api/base";

export async function updateEmployee(id, payload: IStoreUpdateEmployeeRequest) {
    const formData = new FormData();
    formData.append("fullname", payload.fullname);
    formData.append("nip", payload.nip);
    formData.append("year_birthdate", payload.year_birthdate.toString());
    if (payload.address) {
        formData.append("address", payload.address);
    }
    if (payload.phone) {
        formData.append("phone", payload.phone);
    }
    if (payload.religion) {
        formData.append("religion", payload.religion);
    }

    const response = await fetch(
        routeWithParams(parsingRoute(ENDPOINT_API.EMPLOYEES.UPDATE, { id }), {
            _method: "PUT",
        }),
        {
            method: "POST",
            body: formData,
        }
    );
    const jsonResponse = await response.json();

    if (!response.ok) {
        let errorMessage = [jsonResponse.message];
        Object.values(jsonResponse.data).forEach((messageArr) => {
            errorMessage.push(messageArr[0]);
        });
        throw new Error(errorMessage.join(", "));
    }
    return jsonResponse;
}

export async function storeEmployee(payload: IStoreUpdateEmployeeRequest) {
    const formData = new FormData();
    formData.append("fullname", payload.fullname);
    formData.append("nip", payload.nip);
    formData.append("year_birthdate", payload.year_birthdate.toString());
    if (payload.address) {
        formData.append("address", payload.address ?? null);
    }
    if (payload.phone) {
        formData.append("phone", payload.phone);
    }
    if (payload.religion) {
        formData.append("religion", payload.religion);
    }

    const response = await fetch(ENDPOINT_API.EMPLOYEES.STORE, {
        method: "POST",
        body: formData,
    });
    const jsonResponse = await response.json();

    if (!response.ok) {
        let errorMessage = [jsonResponse.message];
        Object.values(jsonResponse.data).forEach((messageArr) => {
            errorMessage.push(messageArr[0]);
        });
        throw new Error(errorMessage.join(", "));
    }
    return jsonResponse;
}

export async function getIndexEmployee(): Promise<IEmployeeIndexResponse> {
    const response = await fetch(ENDPOINT_API.EMPLOYEES.INDEX, {
        method: "GET",
        ...cacheConfig,
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(jsonResponse.message);
    }
    return jsonResponse;
}

export async function getDefaultValueFormEmployee(
    id
): Promise<IEmployeeDefaultValueFormResponse> {
    const response = await fetch(
        parsingRoute(ENDPOINT_API.EMPLOYEES.DEFAULT_VALUE_FOR_FORM, { id }),
        {
            method: "GET",
            ...cacheConfig,
        }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(jsonResponse.message);
    }
    return jsonResponse;
}

export async function getShowEmployee(id): Promise<IEmployeeShowResponse> {
    const response = await fetch(
        parsingRoute(ENDPOINT_API.EMPLOYEES.SHOW, { id }),
        {
            method: "GET",
            ...cacheConfig,
        }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(jsonResponse.message);
    }
    return jsonResponse;
}

export async function destroyEmployee(id) {
    const response = await fetch(
        parsingRoute(ENDPOINT_API.EMPLOYEES.DESTROY, { id }),
        {
            method: "DELETE",
        }
    );
    const jsonResponse = await response.json();
    if (!response.ok) {
        throw new Error(jsonResponse.message);
    }
    return jsonResponse;
}

export async function setActiveEmployee(ids: number[]) {
    const formData = new FormData();
    ids.forEach((id) => {
        formData.append("ids[]", id.toString());
    });

    const response = await fetch(ENDPOINT_API.EMPLOYEES.SET_ACTIVE, {
        method: "POST",
        body: formData,
    });
    const jsonResponse = await response.json();

    if (!response.ok) {
        throw new Error(jsonResponse.message);
    }
    return jsonResponse;
}

export async function setInactiveEmployee(ids: number[]) {
    const formData = new FormData();
    ids.forEach((id) => {
        formData.append("ids[]", id.toString());
    });

    const response = await fetch(ENDPOINT_API.EMPLOYEES.SET_INACTIVE, {
        method: "POST",
        body: formData,
    });
    const jsonResponse = await response.json();

    if (!response.ok) {
        throw new Error(jsonResponse.message);
    }
    return jsonResponse;
}
