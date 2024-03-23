import { colorConfig } from "@/themes/color";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, ModalFuncProps } from "antd";

export const useModalConfirm = () => {
    const { modal } = App.useApp();

    const modalConfirm = (config?: ModalFuncProps) => {
        return modal.confirm({
            title: "Apakah Anda yakin?",
            icon: (
                <ExclamationCircleFilled
                    style={{ color: colorConfig.feedback.warning }}
                />
            ),
            closable: true,
            centered: true,
            type: "confirm",
            ...config,
        });
    };
    return modalConfirm;
};
