type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
