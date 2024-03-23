import { Card } from "antd";
import PageTemplate from "../base";
import { BREADCRUMBS } from "@/commons/breadcrumbs";

export default function DashboardTemplate() {
    return (
        <PageTemplate breadcrumbs={BREADCRUMBS.DASHBOARD()}>
            <Card title="Dashboard"></Card>
        </PageTemplate>
    );
}
