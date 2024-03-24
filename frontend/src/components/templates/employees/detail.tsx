"use client";
import { BREADCRUMBS } from "@/commons/breadcrumbs";
import PageTemplate from "../base";
import { useParams } from "next/navigation";
import { Card, Descriptions, Empty, Image } from "antd";
import { useRouterRefresh } from "@/hooks/useRouterRefresh";
import { IEmployeeDetailmData } from "@/interfaces/responses/employees";

export default function DetailEmployeeTemplate({
    employee,
}: {
    employee: IEmployeeDetailmData;
}) {
    useRouterRefresh();
    const params = useParams();
    return (
        <PageTemplate breadcrumbs={BREADCRUMBS.EMPLOYEES.DETAIL(params.id)}>
            <Card title="Detail Karyawan">
                <Descriptions bordered>
                    <Descriptions.Item label="Nama Lengkap">
                        {employee.fullname}
                    </Descriptions.Item>
                    <Descriptions.Item label="NIP">
                        {employee.nip}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tahun Lahir">
                        {employee.year_birthdate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alamat">
                        {employee.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="No Telepon">
                        {employee.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Agama">
                        {employee.religion}
                    </Descriptions.Item>
                    <Descriptions.Item label="KTP">
                        {employee.identity_card_url ? (
                            <Image
                                src={employee.identity_card_url}
                                width={360}
                                alt={"identity-card-" + employee.fullname}
                            />
                        ) : (
                            <Empty />
                        )}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </PageTemplate>
    );
}
