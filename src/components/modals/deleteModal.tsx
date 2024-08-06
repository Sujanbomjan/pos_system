import { MdClose } from "react-icons/md";
import { ActionIcon, Button, Modal, Text } from "rizzui";

interface ModalProps {
  isOpen: boolean;
  handleDelete?: () => void;
  onClose: () => void;
  title: string;
  //   content: JSX.Element;
}

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  handleDelete,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-auto px-7 pt-6 pb-8">
        <div className="mb-7 flex items-center justify-between">
          <Text className="font-medium">{title}</Text>
          <ActionIcon size="sm" variant="text" onClick={onClose}>
            <MdClose className="h-auto w-6" strokeWidth={1.8} />
          </ActionIcon>
        </div>
        <div className="flex flex-row gap-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="outline" color="danger">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteModal;
