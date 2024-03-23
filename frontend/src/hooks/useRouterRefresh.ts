import { useRouter } from "next/navigation";
import React from "react";

export const useRouterRefresh = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.refresh();
    }, [router]);
};
