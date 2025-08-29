import Navbar from "@/components/layout/Navbar";
import { ReactQueryProvider } from "@/lib/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#10141e]">
        <ReactQueryProvider>
          <div className="h-screen md:p-6 xl:px-8 xl:pb-0 xl:grid xl:grid-cols-[96px_1fr] xl:gap-[36px]">
            <Navbar />

            <main className="overflow-y-auto">{children}</main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
