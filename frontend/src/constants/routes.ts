const BASE_API_URL = "http://127.0.0.1:8000/api";

export const ROUTES = {
    DASHBOARD: "/",
    EMPLOYEES: {
        INDEX: "/employees",
        CREATE: "/employees/create",
        EDIT: "/employees/:id/edit",
        DETAIL: "/employees/:id",
    },
};

export const ENDPOINT_API = {
    EMPLOYEES: {
        INDEX: BASE_API_URL + "/employees",
        DEFAULT_VALUE_FOR_FORM:
            BASE_API_URL + "/employees/:id/default-value-for-form",
        SHOW: BASE_API_URL + "/employees/:id",
        STORE: BASE_API_URL + "/employees/store",
        UPDATE: BASE_API_URL + "/employees/:id/update",
        DESTROY: BASE_API_URL + "/employees/:id/destroy",
        SET_ACTIVE: BASE_API_URL + "/employees/set-active",
        SET_INACTIVE: BASE_API_URL + "/employees/set-inactive",
        UPLOAD_IDENTITY_CARD:
            BASE_API_URL + "/employees/:id/upload-identity-card",
    },
};
