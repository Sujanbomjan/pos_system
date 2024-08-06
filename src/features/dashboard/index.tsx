import WelcomeBanner from "@/components/banners/welcome";
import HandWaveIcon from "@/components/icons/hand-wave";
import Image from "next/image";
import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import AccountRetention from "./analytics-dashboard/account-retention";
import Acquisition from "./analytics-dashboard/acquisition";
import ConversionRates from "./analytics-dashboard/conversion-rates";
import DeviceSessions from "./analytics-dashboard/device-sessions";
import GoalAccomplished from "./analytics-dashboard/goal-accomplished";
import StatCards from "./analytics-dashboard/stat-cards";
import TopTrafficSource from "./analytics-dashboard/top-traffic-source";
import UserMetrics from "./analytics-dashboard/user-metrics";

export default function DashboardAnalytics() {
  return (
    <div className="@container">
      {/* <WelcomeBanner
        title={
          <>
            Good Morning, <br /> Keanu Reeves{" "}
            <HandWaveIcon className="inline-flex h-8 w-8" />
          </>
        }
        description={
          "Here’s What happening on your store today. See the statistics at once."
        }
        media={
          <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
            <div className="relative w-full h-full">
              <Image
                src={"/shop-illustration.png"}
                alt="Welcome shop image form freepik"
                width={300}
                height={300}
                className="dark:brightness-95 dark:drop-shadow-md"
              />
            </div>
          </div>
        }
        contentClassName="@2xl:max-w-[calc(100%-340px)]"
        className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 lg:pb-9 my-6 dark:bg-gray-100/30"
      >
        <Link href={"#"} className="inline-flex">
          <Button as="span" className="h-[38px] shadow md:h-10">
            <PiPlusBold className="me-1 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </WelcomeBanner> */}
      <StatCards className="@2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @7xl:col-span-8 mb-6" />

      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <TopTrafficSource className="@7xl:col-span-4" />

        <UserMetrics className="@4xl:col-span-2 @7xl:col-span-12" />

        {/* <ConversionRates className="@7xl:col-span-6 @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <GoalAccomplished className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-6 @7xl:col-start-auto @7xl:row-start-auto @[90rem]:col-span-5 @[112rem]:col-span-4" /> */}

        {/* <PageMetrics className="@4xl:col-span-2 @4xl:row-start-5 @7xl:col-span-12 @7xl:row-start-auto @[90rem]:col-span-7 @[112rem]:col-span-8" /> */}

        {/* <AccountRetention className="@7xl:col-span-12 @[90rem]:col-span-5 @[112rem]:col-span-4" /> */}

        {/* <WebsiteMetrics className="@4xl:col-span-2 @7xl:col-span-12" /> */}
      </div>
    </div>
  );
}
