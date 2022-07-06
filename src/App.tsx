import React, { useCallback, useState } from 'react';
import { Button } from './components/button/Button';
import { Layout } from './components/layout/Layout';
import { Table } from './components/table/Table';
import { Provider } from 'react-redux';
import { store } from './store';
import { Modal } from './components/modal/Modal';
import { Form } from './components/form/Form';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Layout
          button={<Button text="Add" clickHandler={() => setOpenModal(true)} />}
          table={<Table />}
        />
      </div>
      {openModal && (
        <Modal onClose={closeModal}>
          <Form onCancel={closeModal} />
        </Modal>
      )}
    </Provider>
  );
}

export default App;
