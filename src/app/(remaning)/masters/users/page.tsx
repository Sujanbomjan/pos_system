"use client";

import useFetchRoles from "@/api/hooks/master/roles_permission/get-roles";
import useFetchAdminUsers from "@/api/hooks/master/users/use-fetch-users";
import useCreateApi from "@/api/useCreateApi";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import ActionModal from "@/components/Modal/ActionModal";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import EditAdminUser from "@/features/masters/users/edit-user-modal";
import editUserModal from "@/features/masters/users/edit-user-modal";
import TableBuilder from "@/features/TableBuilders/TableBuilder";
import { UsersData } from "@/types/admin-users";
import { IColumns } from "@/types/table";
import { useModal } from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useState } from "react";
import { Button } from "rizzui";

const pageHeader = {
  title: "Users",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Masters",
    },
    {
      name: "Users",
    },
  ],
};

export default function UsersPage() {
  const columns: IColumns[] = [
    {
      name: "name",
      uid: "name",
    },
    {
      name: "email",
      uid: "email",
    },
    {
      name: "mobile no.",
      uid: "mobile_no",
    },
    {
      name: "role",
      uid: "role",
      type: "custom",
      render: (item: UsersData) => {
        return (
          <ul className="grid grid-cols-2 list-disc gap-6 my-6">
            {item.roles.map((role: any) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      name: "action",
      uid: "action",
      type: "custom",
      render: (item: UsersData) => {
        return (
          <>
            <EditAdminUser item={item} />
          </>
        );
      },
    },
  ];
  //   const deleteMutation = useDeleteSales();

  const { data, isLoading } = useFetchAdminUsers();
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

  return (
    <div className="relative">
      <div className="flex flex-row justify-between items-center w-full mb-6">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />
        <div className="flex flex-row gap-4">
          <Link href={routes.masters.users.createUsers}>
            <Button>Add Users</Button>
          </Link>
        </div>
      </div>

      <LoadingOverlay isVisible={isLoading || loading} />

      <TableBuilder
        // @ts-ignore
        columns={columns}
        tableData={data?.data.data}
        isLoading={isLoading}
        uniqueKey="id"
        tableTitle={""}
        totalPageCount={data?.data.last_page}
        startCountOfPage={data?.data.from || 0}
        endCountOfPage={data?.data.to || 0}
        totalData={data?.data.total || 0}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
      />
    </div>
  );
}
