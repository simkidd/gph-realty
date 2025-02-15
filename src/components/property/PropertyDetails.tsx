"use client";
import { IProperty } from "@/interfaces/property.interface";
import React, { Suspense, useMemo } from "react";
import { TabContent, TabNav, Tabs } from "../ui/Tab";
import Features from "./Features";
import Gallery from "./Gallery";
import VirtualTour from "./VirtualTour";

interface ITab {
  title: string;
  key: string;
  content?: React.ReactNode;
}

const PropertyDetails = ({ property }: { property: IProperty }) => {
  // Memoized tabs configuration
  const tabs = useMemo(() => {
    const baseTabs: ITab[] = [
      {
        title: "About",
        key: "about",
        content: (
          <div className="prose max-w-none">{property?.description}</div>
        ),
      },
      {
        title: "Features",
        key: "feature",
        content: <Features />,
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
          <Suspense fallback={<div>Loading virtual tour...</div>}>
            <VirtualTour data={property} />
          </Suspense>
        ),
      });
    }

    return baseTabs;
  }, [property]);

  if (!property) {
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
                {/* tabs */}
                <Tabs defaultActiveTabKey={tabs[0].key}>
                  <ul className="flex flex-wrap border-b border-b-gray-200">
                    {tabs.map((tab) => (
                      <TabNav key={tab.key} tabKey={tab.key}>
                        {tab.title}
                      </TabNav>
                    ))}
                  </ul>

                  <div>
                    {tabs.map((tab) => (
                      <TabContent
                        key={tab.key}
                        tabKey={tab.key}
                        className="p-[30px]"
                      >
                        {/* Render your tab content here */}
                        {!tab.content && (
                          <div>{tab.title} content goes here.</div>
                        )}
                        {tab.content}
                      </TabContent>
                    ))}
                  </div>
                </Tabs>
              </div>

              {/* reviews */}
              <div className="bg-white shadow-md">
                <div className="p-[30px]">
                  <h4 className="font-semibold mb-5 text-[22px] capitalize leading-[1.2] tracking-wide">
                    Reviews
                  </h4>
                  <div></div>
                  <hr className="my-[30px]" />
                  <h4 className="font-semibold mb-5 text-[22px] capitalize leading-[1.2] tracking-wide">
                    Write a Review
                  </h4>
                  <div>
                    <form></form>
                  </div>
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
