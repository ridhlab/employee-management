"use client";
import { ReligionEnum } from "@/enums/religion.enum";
import { getRequiredMessage } from "@/helpers/form";
import { useModalConfirm } from "@/helpers/modal-confirm";
import { digitOnlyRegex } from "@/helpers/regex";
import { useFormUtility } from "@/hooks/useFormUtility";
import { IEmployee } from "@/interfaces/entities/employees";
import { IStoreUpdateEmployeeRequest } from "@/interfaces/requests/employees";
import { useParams, useRouter } from "next/navigation";
import * as yup from "yup";
import dayjs from "dayjs";
import { storeEmployee, updateEmployee } from "@/api/employees";
import { ENDPOINT_API, ROUTES } from "@/constants/routes";
import { prompNotification } from "@/helpers/notification";
import PageTemplate from "../base";
import { BREADCRUMBS } from "@/commons/breadcrumbs";
import { Card, DatePicker, Form, Input, Radio, Upload } from "antd";
import ButtonAction from "@/components/shared/form/button-action";
import Button from "@/components/shared/buttons/button";
import React from "react";
import { useRouterRefresh } from "@/hooks/useRouterRefresh";
import { parsingRoute } from "@/helpers/routes";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { IEmployeeDetailmData } from "@/interfaces/responses/employees";

const schema = yup.object().shape({
    fullname: yup.string().required(getRequiredMessage("Nama Lengkap")),
    nip: yup
        .string()
        .test("nip", "NIP tidak valid", (val) => digitOnlyRegex.test(val))
        .min(4, "NIP harus 4 digit")
        .max(4, "NIP harus 4 digit")
        .required(getRequiredMessage("NIP")),
    year_birthdate: yup.date().required(getRequiredMessage("Tahun Lahir")),
    address: yup.string().nullable(),
    phone: yup
        .string()
        .matches(digitOnlyRegex, "Format no telepon tidak sesuai")
        .min(9, "Minimal 9 digit")
        .max(14, "Maksimal 14 digit")
        .transform((val) => {
            if (!val) return null;
            return val;
        })
        .nullable(),
    religion: yup
        .mixed<ReligionEnum>()
        .oneOf(Object.values(ReligionEnum))
        .nullable(),
});

export default function FormEmployeeTemplate({
    editPage = false,
    defaultValue,
}: {
    editPage?: boolean;
    defaultValue?: IEmployeeDetailmData;
}) {
    const modalConfirm = useModalConfirm();
    const params = useParams();
    const { form, yupSync } = useFormUtility({ schema });
    const router = useRouter();

    useRouterRefresh();

    const customRequest = async (options: UploadRequestOption<any>) => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();

        fmData.append("identity_card", file);
        try {
            const response = await fetch(
                parsingRoute(ENDPOINT_API.EMPLOYEES.UPLOAD_IDENTITY_CARD, {
                    id: params.id as string,
                }),
                {
                    method: "POST",
                    body: fmData,
                }
            );
            const jsonResponse = await response.json();
            if (!response.ok) throw jsonResponse.message;
            onSuccess("Upload successfully");
            prompNotification({
                message: "Sukses upload KTP",
                method: "success",
            });
            router.refresh();
        } catch (err) {
            onError(new Error("Upload failed"));
            prompNotification({
                message: err as string,
                method: "error",
            });
        }
    };

    const onFinish = async () => {
        modalConfirm({
            onOk: async () => {
                try {
                    await form.validateFields();
                    const dataSubmitted = form.getFieldsValue();
                    const payload: IStoreUpdateEmployeeRequest = {
                        ...dataSubmitted,
                        year_birthdate: parseInt(
                            dayjs(dataSubmitted.year_birthdate)
                                .format("YYYY")
                                .toString()
                        ),
                    };
                    const response = editPage
                        ? await updateEmployee(params?.id, payload)
                        : await storeEmployee(payload);
                    editPage
                        ? router.push(ROUTES.EMPLOYEES.INDEX)
                        : router.push(
                              parsingRoute(ROUTES.EMPLOYEES.EDIT, {
                                  id: response.data.id,
                              })
                          );
                    prompNotification({
                        method: "success",
                        message: editPage
                            ? response.message
                            : "Sukses tambah karyawan, silahkan upload KTP",
                    });
                } catch (error) {
                    prompNotification({
                        message: (error as Error).message,
                        method: "error",
                    });
                }
            },
        });
    };

    return (
        <PageTemplate
            breadcrumbs={
                editPage
                    ? BREADCRUMBS.EMPLOYEES.EDIT(params.id)
                    : BREADCRUMBS.EMPLOYEES.CREATE()
            }
        >
            <Card title="Edit Karyawan">
                <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={
                        editPage
                            ? {
                                  ...defaultValue,
                                  year_birthdate: dayjs(
                                      defaultValue.year_birthdate
                                  ),
                              }
                            : undefined
                    }
                >
                    <Form.Item
                        name="fullname"
                        label="Nama Lengkap"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input nama lengkap" />
                    </Form.Item>
                    <Form.Item
                        name="nip"
                        label="NIP"
                        rules={[yupSync]}
                        required
                    >
                        <Input placeholder="Input NIP" />
                    </Form.Item>
                    <Form.Item
                        name="year_birthdate"
                        label="Tahun Lahir"
                        rules={[yupSync]}
                        required
                    >
                        <DatePicker
                            picker="year"
                            placeholder="Pilih tahun lahir"
                        />
                    </Form.Item>
                    <Form.Item name="address" label="Alamat" rules={[yupSync]}>
                        <Input placeholder="Input alamat" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="No Telepon"
                        rules={[yupSync]}
                    >
                        <Input placeholder="Input no telepon" />
                    </Form.Item>
                    <Form.Item name="religion" label="Agama" rules={[yupSync]}>
                        <Radio.Group>
                            <Radio value={ReligionEnum.ISLAM}>Islam</Radio>
                            <Radio value={ReligionEnum.KRISTEN}>Kristen</Radio>
                            <Radio value={ReligionEnum.KATOLIK}>Katolik</Radio>
                            <Radio value={ReligionEnum.BUDDHA}>Buddha</Radio>
                            <Radio value={ReligionEnum.HINDU}>Hindu</Radio>
                            <Radio value={ReligionEnum.KONGHUCHU}>
                                Konghuchu
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    {editPage ? (
                        <Form.Item label="KTP">
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                accept="image/png, image/jpg"
                                customRequest={customRequest}
                                defaultFileList={
                                    editPage && defaultValue.identity_card_url
                                        ? [
                                              {
                                                  url: defaultValue.identity_card_url,
                                                  name: defaultValue.identity_card_filename,
                                                  uid: defaultValue.identity_card_url,
                                              },
                                          ]
                                        : undefined
                                }
                            >
                                Upload KTP
                            </Upload>
                        </Form.Item>
                    ) : null}
                    <ButtonAction
                        actions={[
                            <Button href={ROUTES.EMPLOYEES.INDEX} key="back">
                                Kembali
                            </Button>,

                            <Button type="primary" key="save" htmlType="submit">
                                Simpan
                            </Button>,
                        ]}
                    />
                </Form>
            </Card>
        </PageTemplate>
    );
}
