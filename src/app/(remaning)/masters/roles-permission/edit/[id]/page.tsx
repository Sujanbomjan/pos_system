"use client";
import useFetchRolesById from "@/api/hooks/master/roles_permission/get-roles-by-id";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import PageHeader from "@/components/PageHeader/page-header";
import { routes } from "@/config/routes";
import EditRolePermission from "@/features/masters/setting/roles-permission/edit-roles-permission";
import { useRouter } from "next-nprogress-bar";
import { Button } from "rizzui";

const pageHeader = {
  title: "Roles and Permission",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      href: routes.masters.roles_permission.viewRoles,
      name: "Roles and Permission",
    },
    {
      name: "Create",
    },
  ],
};

const EditRolesPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = params.id;

  const { data: rolesData, isLoading: rolesLoading } = useFetchRolesById(id);

  return (
    <>
      <div className="flex justify-between">
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />

        <Button
          as="span"
          variant="outline"
          onClick={() => router.push(routes.masters.roles_permission.viewRoles)}
        >
          Cancel
        </Button>
      </div>
      <LoadingOverlay isVisible={rolesLoading} />
      {rolesData && (
        <div className="my-10">
          <EditRolePermission rolesData={rolesData} />
        </div>
      )}
    </>
  );
};

export default EditRolesPage;
