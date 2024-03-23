import { ROUTES } from "../constants/routes";
import { parsingRoute } from "../helpers/routes";

export const BREADCRUMBS = {
    DASHBOARD: () => [{ label: "Dashboard", href: ROUTES.DASHBOARD }],
    EMPLOYEES: {
        INDEX: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Karyawan", href: ROUTES.EMPLOYEES.INDEX },
        ],
        CREATE: () => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Karyawan", href: ROUTES.EMPLOYEES.INDEX },
            { label: "Tambah Karyawan", href: ROUTES.EMPLOYEES.CREATE },
        ],
        EDIT: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Karyawan", href: ROUTES.EMPLOYEES.INDEX },
            {
                label: "Edit Karyawan",
                href: parsingRoute(ROUTES.EMPLOYEES.EDIT, { id }),
            },
        ],
        DETAIL: (id) => [
            { label: "Dashboard", href: ROUTES.DASHBOARD },
            { label: "Karyawan", href: ROUTES.EMPLOYEES.INDEX },
            {
                label: "Detail Karyawan",
                href: parsingRoute(ROUTES.EMPLOYEES.DETAIL, { id }),
            },
        ],
    },
};
