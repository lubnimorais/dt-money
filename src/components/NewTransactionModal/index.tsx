import Modal from 'react-modal';

interface INewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewTransactionModal = ({ isOpen, onRequestClose}: INewTransactionModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Cadastrar transação</h2>
    </Modal>
  )
}

export { NewTransactionModal }