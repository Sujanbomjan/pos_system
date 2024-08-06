"use client";

import useFetchRoles from "@/api/hooks/master/roles_permission/get-roles";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { RolesData } from "@/types/roles";
import { IColumns, TableActionHandler } from "@/types/table";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useState } from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Roles and Permission",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Roles and Permission",
    },
  ],
};

export default function RolesPermissionPage() {
  const columns: IColumns[] = [
    {
      name: "role",
      uid: "name",
    },
    {
      name: "permissions",
      uid: "permission",
      type: "custom",
      render: (item: RolesData) => {
        return (
          <ul className="grid grid-cols-2 list-disc gap-6 my-6">
            {item.permissions.map((permission: any) => (
              <li key={permission.id}>{permission.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      name: "actions",
      uid: "actions",
    },
  ];
  //   const deleteMutation = useDeleteSales();

  const { data, isLoading } = useFetchRoles();
  const router = useRouter();

  const [selectedRowId, setSelectedRowId] = useState<any[]>([]);

  //mulitple delete logic for demo purpose only
  const [loading, setLoading] = useState(false);
  const api = useCreateApi();
  const client = useQueryClient();
  const deleteSelected = async () => {
    // setLoading(true);
    // try {
    //   const requests = selectedRowId.map((item) =>
    //     api.delete(getApiRoute("deleteSales")(item))
    //   );
    //   await Promise.all(requests).then((res) => {
    //     client.invalidateQueries({
    //       predicate: (query) => {
    //         return ["roles"].includes(query.queryKey[0] as string);
    //       },
    //     });
    //     toast.success(`Successfully deleted ${selectedRowId.length} items`);
    //     setSelectedRowId([]);
    //   });
    // } catch (err) {
    //   toast.error("Error while deleting the data");
    // } finally {
    //   setLoading(false);
    // }
  };
  const actionModal = useModal(ActionModal);

  const tableActionHandler: TableActionHandler = {
    handleEdit: (id) => {
      router.push(routes.masters.roles_permission.editRoles(id));
    },
    // handleDelete(id) {
    //   actionModal.show({
    //     handleAction: () =>
    //       deleteMutation.mutate(
    //         { id },
    //         {
    //           onSuccess: () => {
    //             toast.success(`Item deleted successfully`);
    //             actionModal.hide();
    //             refetch();
    //           },
    //           onError: () => {
    //             toast.error(`Error while deleting`);
    //           },
    //         }
    //       ),
    //   });
    // },
  };

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <div className="flex flex-row gap-4">
          <Link href={routes.masters.roles_permission.createRoles}>
            <Button>Add Roles</Button>
          </Link>
        </div>
      </div>

      <LoadingOverlay isVisible={isLoading || loading} />

      <TableBuilder
        actionHandler={tableActionHandler}
        // handleClickOnColumns={handleClickOnColumns}
        // @ts-ignore
        columns={columns}
        tableData={data?.data.data}
        isLoading={isLoading}
        uniqueKey="id"
        // filterFormData={filterFormData[0]}
        tableTitle={""}
        totalPageCount={data?.data.last_page}
        startCountOfPage={data?.data.from || 0}
        endCountOfPage={data?.data.to || 0}
        totalData={data?.data.total || 0}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
        // handleSelectedDelete={deleteSelected}
        // handleSelectedExport={exportSelected}
      />
    </div>
  );
}
