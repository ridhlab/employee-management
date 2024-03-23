import { getDefaultValueFormEmployee } from "@/api/employees";
import FormEmployeeTemplate from "@/components/templates/employees/form";

export default async function EmployeeEditPage(props) {
    const defaultValue = await getDefaultValueFormEmployee(props.params.id);
    return <FormEmployeeTemplate defaultValue={defaultValue.data} editPage />;
}
