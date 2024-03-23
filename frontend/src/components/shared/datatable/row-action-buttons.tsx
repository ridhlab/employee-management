import { Space, Tooltip } from "antd";
import React from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Button from "../buttons/button";

interface IButtonAction {
    type: "detail" | "edit" | "delete" | "custom";
    href?: string;
    button?: React.ReactNode;
    onClick?: () => void;
}

interface IProps {
    actions: IButtonAction[];
}

const RowActionButtons: React.FC<IProps> = ({ actions }) => {
    const renderButtonAction = (action: IButtonAction) => {
        switch (action.type) {
            case "detail":
                return (
                    action.button ?? (
                        <Tooltip title="Detail">
                            <Button
                                icon={<EyeOutlined />}
                                href={action.href}
                            ></Button>
                        </Tooltip>
                    )
                );
            case "edit":
                return (
                    action.button ?? (
                        <Tooltip title="Edit">
                            <Button
                                icon={<EditOutlined />}
                                href={action.href}
                            ></Button>
                        </Tooltip>
                    )
                );
            case "delete":
                return (
                    action.button ?? (
                        <Tooltip title="Hapus">
                            <Button
                                icon={<DeleteOutlined />}
                                onClick={action.onClick}
                            ></Button>
                        </Tooltip>
                    )
                );
            case "custom":
                return action.button;
            default:
                return <React.Fragment></React.Fragment>;
        }
    };
    return (
        <Space>
            {actions.map((action, index) => (
                <React.Fragment key={index}>
                    {renderButtonAction(action)}
                </React.Fragment>
            ))}
        </Space>
    );
};

export default RowActionButtons;
