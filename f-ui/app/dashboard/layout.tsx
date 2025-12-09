import Sidebar from "@/components/layout/Sidebar";
import "@/app/globals.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex bg-gray-50 p-6 gap-6">
      <div className="w-1/12 min-h-full">
        <Sidebar />
      </div>
      <div className="w-11/12 min-h-full overflow-hidden">
        <div className="h-full overflow-y-auto hidescroll">
          {children}
        </div>
      </div>
    </div>
  );
}
