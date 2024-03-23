"use client";
import { ROUTES } from "@/constants/routes";
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Grid, Layout, Menu, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

interface IProps {
    children: React.ReactNode;
}

const menuKey = {
    Dashboard: ROUTES.DASHBOARD,
    Employees: ROUTES.EMPLOYEES.INDEX,
};

export default function MainLayout({ children }: IProps) {
    const [isSiderCollapsed, setIsSiderCollapsed] = React.useState(false);
    const [activeMenuKey, setActiveMenuKey] = React.useState(null);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const pathname = usePathname();

    const { md } = Grid.useBreakpoint();

    const menuItems = React.useMemo<ItemType<MenuItemType>[]>(
        () => [
            {
                key: menuKey.Dashboard,
                icon: <DashboardOutlined />,
                label: <Link href={ROUTES.DASHBOARD}>Dashboard</Link>,
            },
            {
                key: menuKey.Employees,
                icon: <UserOutlined />,
                label: <Link href={ROUTES.EMPLOYEES.INDEX}>Karyawan</Link>,
            },
        ],
        []
    );

    React.useEffect(() => {
        setIsSiderCollapsed(!md);
    }, [md]);

    React.useEffect(() => {
        setActiveMenuKey(pathname);
    }, [pathname]);

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                width={240}
                collapsed={isSiderCollapsed}
                style={{
                    height: "100vh",
                    overflow: "auto",
                    padding: "2rem 0",
                }}
            >
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                >
                    {/* TODO : Update Logo */}
                    <h1
                        style={{
                            fontSize: "2rem",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        LOGO
                    </h1>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={activeMenuKey}
                        items={menuItems}
                    />
                </Space>
            </Sider>
            <Layout style={{ overflow: "scroll", maxHeight: "100vh" }}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Flex justify="space-between" align="center">
                        <Button
                            type="text"
                            icon={
                                isSiderCollapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() =>
                                setIsSiderCollapsed(!isSiderCollapsed)
                            }
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Flex>
                </Header>
                <Content style={{ padding: "2rem 1rem" }}>{children}</Content>
            </Layout>
        </Layout>
    );
}
