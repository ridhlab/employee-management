import { Breadcrumb, Space } from "antd";
import Link from "next/link";
import React from "react";

interface IProps {
    children: React.ReactNode;
    breadcrumbs?: { label: string; href: string }[];
}

export default function PageTemplate({ children, breadcrumbs }: IProps) {
    return (
        <Space size="middle" direction="vertical" style={{ width: "100%" }}>
            <Breadcrumb
                items={breadcrumbs?.map(({ href, label }, index) => ({
                    key: index,
                    title: <Link href={href}>{label}</Link>,
                }))}
            />
            {children}
        </Space>
    );
}
