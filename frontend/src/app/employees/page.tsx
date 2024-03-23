import { getIndexEmployee } from "@/api/employees";
import EmployeeIndexTemplate from "@/components/templates/employees";

export default async function EmployeesIndexPage() {
    const employees = await getIndexEmployee();
    return <EmployeeIndexTemplate employees={employees.data} />;
}
