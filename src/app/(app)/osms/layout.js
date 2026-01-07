import AppNavbar from "@/components/layout/AppNavbar";

const { Layout } = require("lucide-react");

Layout.displayName = "OsmsLayout";

export default function OsmsLayout({ children }) {
  return (
    <div>
      <AppNavbar menuSwitch="osms" />
      {children}
    </div>
  );
}
