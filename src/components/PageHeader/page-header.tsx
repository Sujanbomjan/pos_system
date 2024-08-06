import cn from "@/utils/class-names";
import { Title } from "rizzui";
import Breadcrumb from "./Breadcrumb";

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: any }[];
  className?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header className={cn("xs:-mt-2", className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <Title
            as="h2"
            className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
          >
            {title}
          </Title>

          <Breadcrumb
            separator=""
            separatorVariant="circle"
            className="flex-wrap"
          >
            {breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                {...(item?.href && { href: item?.href })}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        {children}
      </div>
    </header>
  );
}
