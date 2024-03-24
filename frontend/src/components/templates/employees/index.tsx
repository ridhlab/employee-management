"use client";
import { BREADCRUMBS } from "@/commons/breadcrumbs";
import PageTemplate from "../base";
import DataTable from "@/components/shared/datatable/datatable";
import { Card, Space, Tag } from "antd";
import Button from "@/components/shared/buttons/button";
import { PlusOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";
import { IEmployee } from "@/interfaces/entities/employees";
import RowActionButtons from "@/components/shared/datatable/row-action-buttons";
import { parsingRoute } from "@/helpers/routes";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useRouterRefresh } from "@/hooks/useRouterRefresh";
import { useModalConfirm } from "@/helpers/modal-confirm";
import {
    destroyEmployee,
    setActiveEmployee,
    setInactiveEmployee,
} from "@/api/employees";
import { prompNotification } from "@/helpers/notification";
import { useRouter } from "next/navigation";
import { useSelectedRowKeys } from "@/hooks/useSelectedRowKeys";

export default function EmployeeIndexTemplate({
    employees,
}: {
    employees: IEmployee[];
}) {
    const router = useRouter();
    useRouterRefresh();

    const modalConfirm = useModalConfirm();
    const { selectedRowKeys, setSelectedRowKeys } = useSelectedRowKeys();

    const columns: ColumnsType<IEmployee> = [
        {
            title: "Nama",
            dataIndex: "fullname",
            key: "fullname",
        },
        {
            title: "NIP",
            dataIndex: "nip",
            key: "nip",
        },
        {
            title: "No Telepon",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Agama",
            dataIndex: "religion",
            key: "religion",
        },
        {
            title: "Status",
            dataIndex: "activate_status",
            key: "activate_status",
            render: (statusActive) =>
                statusActive ? (
                    <Tag color="green">aktif</Tag>
                ) : (
                    <Tag color="red">inaktif</Tag>
                ),
        },
        {
            title: "Aksi",
            dataIndex: "id",
            key: "action",
            render: (id) => (
                <RowActionButtons
                    actions={[
                        {
                            type: "detail",
                            href: parsingRoute(ROUTES.EMPLOYEES.DETAIL, { id }),
                        },
                        {
                            type: "edit",
                            href: parsingRoute(ROUTES.EMPLOYEES.EDIT, { id }),
                        },
                        {
                            type: "delete",
                            onClick: () => {
                                modalConfirm({
                                    onOk: async () => {
                                        try {
                                            const response =
                                                await destroyEmployee(id);
                                            prompNotification({
                                                method: "success",
                                                message: response.message,
                                            });
                                            router.refresh();
                                        } catch (error) {
                                            prompNotification({
                                                message: (error as Error)
                                                    .message,
                                                method: "error",
                                            });
                                        }
                                    },
                                });
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    const handleClickSetActive = () => {
        modalConfirm({
            onOk: async () => {
                try {
                    const response = await setActiveEmployee(selectedRowKeys);
                    prompNotification({
                        method: "success",
                        message: response.message,
                    });
                    router.refresh();
                } catch (error) {
                    prompNotification({
                        method: "error",
                        message: (error as Error).message,
                    });
                }
            },
        });
    };

    const handleClickSetInactive = () => {
        modalConfirm({
            onOk: async () => {
                try {
                    const response = await setInactiveEmployee(selectedRowKeys);
                    prompNotification({
                        method: "success",
                        message: response.message,
                    });
                    router.refresh();
                } catch (error) {
                    prompNotification({
                        method: "error",
                        message: (error as Error).message,
                    });
                }
            },
        });
    };

    return (
        <PageTemplate breadcrumbs={BREADCRUMBS.EMPLOYEES.INDEX()}>
            <Card
                title="Daftar Karyawan"
                extra={
                    <Button
                        icon={<PlusOutlined />}
                        href={ROUTES.EMPLOYEES.CREATE}
                    >
                        Tambah
                    </Button>
                }
            >
                <Card
                    title={
                        <Space>
                            <Button
                                disabled={selectedRowKeys.length === 0}
                                onClick={handleClickSetActive}
                            >
                                Set Aktif
                            </Button>
                            <Button
                                disabled={selectedRowKeys.length === 0}
                                onClick={handleClickSetInactive}
                            >
                                Set Inaktif
                            </Button>
                        </Space>
                    }
                >
                    <DataTable
                        dataSource={employees}
                        columns={columns}
                        rowSelection={{
                            onChange: (selectedRowKeys) => {
                                setSelectedRowKeys(selectedRowKeys);
                            },
                        }}
                        rowKey="id"
                    />
                </Card>
            </Card>
        </PageTemplate>
    );
}
