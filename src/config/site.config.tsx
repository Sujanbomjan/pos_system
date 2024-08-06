import { Metadata } from "next";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

enum MODE {
  DARK = "dark",
  LIGHT = "light",
}

export const siteConfig = {
  title: "JHATTAI RMS",
  description: `Jhattai Rms with POS (Point of Sale) module is a web application that allows you to manage your sales and inventory on site. Update your stock information, make purchases and view sales data from anywhere whether in the office, at home, in the warehouse, or on the go. All you need to access this a device with internet connection. SajiloRms has built-in Invoice and Inventory System. Invoice System has Tax and Discounts. These will be really helpful to apply taxes and discounts automatically and the ability to generate invoice from quotation.`,
  // logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - JHATTAI RMS` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - JHATTAI RMS` : title,
      description,
      url: "",
      siteName: "JHATTAI RMS", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "",
        width: 1200,
        height: 630,
      },
      locale: "en_US",
      type: "website",
    },
  };
};
