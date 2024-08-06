import React from "react";
import { MdClose } from "react-icons/md";
import { ActionIcon, Modal, Text } from "rizzui";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactElement;
  isLoading?: boolean;
  containerClassName?: string;
}

const ModalWrapper: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  isLoading = false,
  containerClassName,
}) => {
  return (
    <Modal
      containerClassName={containerClassName}
      isOpen={isOpen}
      onClose={onClose}
    >
      <LoadingOverlay isVisible={isLoading} />
      <div className="m-auto px-7 pt-6 pb-8">
        <div className="mb-7 flex items-center justify-between">
          <Text className="font-semibold text-lg">{title}</Text>
          <ActionIcon size="sm" variant="text" onClick={onClose}>
            <MdClose className="h-auto w-6" strokeWidth={0} />
          </ActionIcon>
        </div>
        {children}
      </div>
    </Modal>
  );
};
export default ModalWrapper;