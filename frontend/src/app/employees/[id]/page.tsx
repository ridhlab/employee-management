import { getShowEmployee } from "@/api/employees";
import DetailEmployeeTemplate from "@/components/templates/employees/detail";

export default async function EmployeeDetailPage(props) {
    const employee = await getShowEmployee(props.params.id);
    return <DetailEmployeeTemplate employee={employee.data} />;
}
