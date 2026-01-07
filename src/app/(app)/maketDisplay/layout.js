import AppNavbar from "@/components/layout/AppNavbar";
// import { getMaketClient } from "@/lib/mqtt/maketClient";

const { Layout } = require("lucide-react");

Layout.displayName = "MaketDisplayLayout";

export default function MaketDisplayLayout({ children }) {
  // 🔑 ensures MQTT starts when layout loads
  // getMaketClient();
  return (
    <div>
      <AppNavbar menuSwitch="maket" />
      {children}
    </div>
  );
}
