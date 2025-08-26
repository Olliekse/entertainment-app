import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-[#10141e] h-[100vh] overflow-y-auto md:p-6 xl:px-8 xl:pb-0 xl:grid xl:grid-cols-[96px_1fr] xl:gap-[36px]">
          <Navbar />

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
