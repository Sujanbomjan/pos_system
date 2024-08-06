import { IoIosClose } from "react-icons/io";
import { ActionIcon, Button, Modal, Text } from "rizzui";

interface ModalProps {
  isOpen: boolean;
  handleAction: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleAction,
  title,
  description,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative m-auto px-7 gap-4 pt-6 pb-8 flex flex-col items-center">
        <ActionIcon
          size="md"
          variant="text"
          onClick={onClose}
          className="absolute right-2 top-2"
          tabIndex={3}
        >
          <IoIosClose className="h-auto w-8" strokeWidth={1.8} />
        </ActionIcon>
        <Text className="font-medium text-lg">{title || "Are you sure?"}</Text>
        <p className="text-center">
          {description ||
            "This action cannot be undone. Ensure you want to perform this action."}
        </p>
        <div className="flex flex-row gap-4">
          <Button
            onClick={handleAction}
            size="sm"
            className="px-6"
            tabIndex={1}
          >
            YES
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="px-6"
            tabIndex={2}
          >
            NO
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
