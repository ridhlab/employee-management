import React from "react";

export const useSelectedRowKeys = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

    return { selectedRowKeys, setSelectedRowKeys };
};
