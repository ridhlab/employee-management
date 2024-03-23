"use client";
import { colorConfig } from "@/themes/color";
import { App, ConfigProvider } from "antd";
import { AppProgressBar } from "next-nprogress-bar";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <AppProgressBar
                height="4px"
                color={colorConfig.primary.main}
                options={{ showSpinner: false }}
                shallowRouting
            />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: colorConfig.primary.main,
                    },
                }}
            >
                <App>{children}</App>
            </ConfigProvider>
        </React.Fragment>
    );
}
