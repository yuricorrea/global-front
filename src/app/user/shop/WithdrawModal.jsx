import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";

const { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } = require("@nextui-org/react")

const WithdrawModal = ({ handleSubmit, loading, orderSelected, handleClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (!orderSelected) setIsOpen(false);
    else setIsOpen(true);
  }, [orderSelected])

  const onOpenChange = (open) => {
    if (!open) {
      setIsOpen(false);
      handleClose();
    }
  }

  const onClose = () => {
    setIsOpen(false);
    handleClose();
  }

  return (
    <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            onClose={onClose}
        >
            <ModalContent>{() => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirmar o resgate de {orderSelected?.symbol}</ModalHeader>
                <ModalBody>
                    <div className="w-full flex items-center">
                      <p className="text-default-600 text-small leading-none">
                        Serão adicionados {formatCurrency(orderSelected?.amount / 100 * 2)} à sua carteira.
                      </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={toggleModal}>Cancelar</Button>
                    <Button isLoading={loading} color="primary" onClick={handleSubmit}>Resgatar</Button>
                </ModalFooter>
              </>
            )}
            </ModalContent>
        </Modal>
  )
}

export default WithdrawModal;