import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { GoTrash } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import { ActionIcon, Button, Modal, Text } from "rizzui";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

interface ModalProps {
  handleAction: () => void;
  handleUserClose?: () => void;
  title: string;
  isLoading: boolean;
  icon?: React.ReactNode;
  text?: string;
  deleteButtonText?: string;
  isPrimary?: boolean;
}

export default NiceModal.create(
  ({
    handleAction,
    title,
    handleUserClose,
    isLoading,
    text,
    deleteButtonText,
    icon,
    isPrimary = false, // Default to false
  }: ModalProps) => {
    const modal = useModal();
    const handleClose = () => {
      handleUserClose ? handleUserClose() : modal.hide();
    };

    return (
      <Modal isOpen={modal.visible} onClose={handleClose}>
        <LoadingOverlay isVisible={isLoading} />
        <div className="relative m-auto px-7 gap-4 pt-6 pb-8 flex flex-col items-center">
          <ActionIcon
            size="md"
            variant="text"
            onClick={() => handleClose()}
            className="absolute right-2 top-2"
            tabIndex={3}
          >
            <IoIosClose className="h-auto w-8" strokeWidth={1.8} />
          </ActionIcon>
          <div
            className={`size-12 rounded-full flex items-center justify-center ${
              isPrimary ? "bg-blue-100" : "bg-red-50"
            }`}
          >
            {icon || <GoTrash size={24} className="text-red-500" />}
          </div>
          <Text className="font-medium text-lg">
            {title || "Permanently delete these data ?"}
          </Text>
          <p className="text-center !text-slate-500">
            {text ||
              "This action cannot be undone. All values associated with these fields will be deleted."}
          </p>
          <div className="flex flex-row gap-4">
            <Button
              onClick={() => {
                handleAction();
                modal.hide();
              }}
              size="sm"
              className="px-6"
              color={isPrimary ? "primary" : "danger"}
              tabIndex={1}
            >
              {deleteButtonText || "Delete"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleClose()}
              className="px-6"
              tabIndex={2}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
