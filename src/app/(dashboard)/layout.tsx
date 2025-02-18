
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative w-full lg:w-[calc(100%-16rem)]">
        <div className="">{children}</div>
      </main>
    </>
  );
}
