import { Space, Table, TableProps } from "antd";
import React from "react";

interface IPropsDataTable extends TableProps {}

export default function DataTable({ ...props }: IPropsDataTable) {
    return (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Table size="small" {...props} />
        </Space>
    );
}
