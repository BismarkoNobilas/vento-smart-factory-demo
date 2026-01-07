import AlertLogCard from "@/components/custom/AlertLogCard";
import AlertLogModal from "@/components/custom/AlertLogModal";
import AppNavbar from "@/components/layout/AppNavbar";

const { Layout } = require("lucide-react");

Layout.displayName = "OsmsLayout";

export default function OsmsLayout({ children }) {
  return (
    <div>
      <div className="fixed top-4 right-4 z-50 bg-amber-300/80 rounded-md shadow-lg h-4 w-3">
        <AlertLogModal />
      </div>
      <AppNavbar menuSwitch="osms" />
      <div className="flex justify-center gap-1">
        <div>{children}</div>
        <div className="w-80 mt-2">
          <AlertLogCard />
        </div>
      </div>
    </div>
  );
}
