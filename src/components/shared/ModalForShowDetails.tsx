import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ModalForShowDetails = ({
  isOpen,
  onCloseModal,
  data,
}: {
  isOpen: boolean;
  onCloseModal: () => void;
  data: any;
}) => {
  console.log(data, "dataatatatttt");
  return (
    <div>
      {/* View User Dialog */}
      <Dialog open={isOpen} onOpenChange={onCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {data && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>name</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">'name'</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>mail</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p>role</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p>status</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vendor</p>
                  <p>vendor</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p>time</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalForShowDetails;
