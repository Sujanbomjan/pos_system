import { routes } from "@/config/routes";

interface Routes {
  [key: string]: string | Routes | ((id: string) => string);
}

interface PageLink {
  name: string;
  href?: string;
}

const processRoutes = (routeObj: Routes, parentKey = ""): PageLink[] => {
  let result: PageLink[] = [];

  Object.entries(routeObj).forEach(([key, value]) => {
    if (key === "auth") {
      // Skip the auth routes
      return;
    }

    const routeName = parentKey
      ? `${key !== "index" ? key : parentKey}`.trim()
      : key;

    if (typeof value === "string") {
      result.push({
        name: routeName.replace(/([A-Z])/g, " $1").trim(),
        href: value,
      });
    } else if (typeof value === "object" && !Array.isArray(value)) {
      result = result.concat(processRoutes(value, routeName));
    }
  });

  return result;
};

// Generate the pageLinks array
export const pageLinks: PageLink[] = [...processRoutes(routes as Routes)];
