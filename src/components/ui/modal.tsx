import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  description?: string;
}

export const Modal = ({
  open,
  onOpenChange,
  trigger,
  children,
  title,
  description,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in-0 z-[50]" />
          <DialogContent className="w-[500px] p-4  popoverContent shadow-lg border rounded-lg">
            <div className="grid gap-4 text-black dark:text-white">
              {(title || description) && (
                <DialogHeader className="space-y-2">
                  {title && (
                    <DialogTitle className="font-medium leading-none">
                      {title}
                    </DialogTitle>
                  )}
                  {description && (
                    <DialogDescription className="text-sm text-muted-foreground">
                      {description}
                    </DialogDescription>
                  )}
                </DialogHeader>
              )}
              {children}
            </div>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
