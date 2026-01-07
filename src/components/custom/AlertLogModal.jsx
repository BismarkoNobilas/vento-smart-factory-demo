import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import AlertLogCard from "./AlertLogCard";

export default function AlertLogModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <AlertLogCard />
      </DialogContent>
    </Dialog>
  );
}
