const ModalContainer = ({ children, isActive, closeModal }) => {
  const container = "fixed z-50 bg-black bg-opacity-25 w-full h-full top-0 right-0 flex justify-center items-center";

  const onCloseModal = (e) => {
    if (e.target.id === "modalContainer") {
      closeModal();
    }
  };

  return (
    isActive && (
      <div id="modalContainer" onClick={onCloseModal} className={container}>
        {children}
      </div>
    )
  );
};

export default ModalContainer;
