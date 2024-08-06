import { MdClose } from "react-icons/md";
import { ActionIcon, Modal, Text } from "rizzui";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: JSX.Element;
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="m-auto px-7 pt-6 pb-8">
        <div className="mb-7 flex items-center justify-between">
          <Text className="font-semibold text-lg">{title}</Text>
          <ActionIcon size="sm" variant="text" onClick={onClose}>
            <MdClose className="h-auto w-6" strokeWidth={0} />
          </ActionIcon>
        </div>
        {content}
      </div>
    </Modal>
  );
};
export default CustomModal;
