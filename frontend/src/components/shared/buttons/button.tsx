"use client";
import { useMounted } from "@/hooks/useMounted";
import { ButtonProps, Button as ButtonAntd } from "antd";
import Link from "next/link";
import React from "react";

interface IProps extends ButtonProps {}

const Button: React.FC<IProps> = (props) => {
    const mounted = useMounted();
    const btn = <ButtonAntd {...props}>{props.children}</ButtonAntd>;
    return props.href && mounted ? <Link href={props.href}>{btn}</Link> : btn;
};

export default Button;
