"use client";
import { IProperty } from "@/interfaces/property.interface";
import React, { Suspense, useMemo } from "react";
import { TabContent, TabNav, Tabs } from "../ui-custom/Tab";
import Features from "./Features";
import Gallery from "./Gallery";
import VirtualTour from "./VirtualTour";
import { ReviewForm } from "./ReviewForm";
import Skeleton from "../ui-custom/Skeleton";

interface ITab {
  title: string;
  key: string;
  content?: React.ReactNode;
}

const PropertyDetails = ({
  property,
  loading,
}: {
  property: IProperty;
  loading: boolean;
}) => {
  // Memoized tabs configuration
  const tabs = useMemo(() => {
    if (loading) {
      return [
        {
          title: "About",
          key: "about",
          content: <Skeleton className="h-40 w-full" />,
        },
        {
          title: "Features",
          key: "feature",
          content: <Skeleton className="h-40 w-full" />,
        },
        {
          title: "Gallery",
          key: "gallery",
          content: <Skeleton className="h-40 w-full" />,
        },
      ];
    }

    const baseTabs: ITab[] = [
      {
        title: "About",
        key: "about",
        content: <div className="prose max-w-none">{property?.description}</div>,
      },
      {
        title: "Features",
        key: "feature",
        content: <Features property={property} />,
      },
      {
        title: "Gallery",
        key: "gallery",
        content: <Gallery images={property?.images || []} />,
      },
    ];

    if (property?.virtualTour) {
      baseTabs.push({
        title: "Virtual Tour",
        key: "virtualTour",
        content: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            }
          >
            <VirtualTour data={property} />
          </Suspense>
        ),
      });
    }

    return baseTabs;
  }, [property, loading]);

  if (!loading && !property) {
    return (
      <div className="container mx-auto text-center py-20">
        <h2 className="text-2xl font-semibold">Property not found</h2>
      </div>
    );
  }

  return (
    <section className="lg:mt-[30px] lg:py-[90px]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-9 px-3">
            <div className="flex flex-col gap-[30px]">
              <div className="bg-white shadow-md">
                {/* Tabs */}
                <Tabs defaultActiveTabKey={tabs[0].key}>
                  <ul className="flex flex-wrap border-b border-b-gray-200">
                    {tabs.map((tab) => (
                      <TabNav key={tab.key} tabKey={tab.key}>
                        {loading ? <Skeleton className="h-6 w-20" /> : tab.title}
                      </TabNav>
                    ))}
                  </ul>

                  <div>
                    {tabs.map((tab) => (
                      <TabContent
                        key={tab.key}
                        tabKey={tab.key}
                        className="lg:p-[30px] py-6 px-4"
                      >
                        {tab.content}
                      </TabContent>
                    ))}
                  </div>
                </Tabs>
              </div>

              {/* Reviews Section */}
              <div className="bg-white shadow-md">
                <div className="lg:p-[30px] py-6 px-4">
                  <h4 className="font-semibold mb-5 text-[22px] capitalize leading-[1.2] tracking-wide">
                    Write a Review
                  </h4>

                  {loading ? <Skeleton className="h-32 w-full" /> : <ReviewForm />}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 px-3"></div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
