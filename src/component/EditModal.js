import React from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import '../App.css'

class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deskripsi: props.transaction.deskripsi,
            nominal: props.transaction.nominal,
            tanggal: props.transaction.tanggal,
            category: props.transaction.category,
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        const updatedTransaction = {
            ...this.props.transaction,
            deskripsi: this.state.deskripsi,
            nominal: Number(this.state.nominal),
            tanggal: this.state.tanggal,
            category: this.state.category,
        };
        this.props.onSave(updatedTransaction);
        this.props.onClose();
    };

    handleDelete = () => {
        const { transaction, onDelete, onClose } = this.props;
        onDelete(transaction);
        onClose();
    };

    render() {
        const { onClose } = this.props;
        const { deskripsi, nominal, tanggal, category } = this.state;

        return (
            <Modal show={true} onHide={onClose} centered className="edit-modal">
                <div className="modal-content">
                    <Modal.Header closeButton>
                        <Modal.Title className='modal-heading'>Edit Transaksi</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="deskripsiInput" className="form-label">
                                Deskripsi:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="deskripsiInput"
                                name="deskripsi"
                                value={deskripsi}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nominalInput" className="form-label">
                                Nominal:
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="nominalInput"
                                name="nominal"
                                value={nominal}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tanggalInput" className="form-label">
                                Tanggal:
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="tanggalInput"
                                name="tanggal"
                                value={tanggal}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryInput" className="form-label">
                                Status Transaksi:
                            </label>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-category">
                                    {category === 'IN' ? 'Pemasukan' : 'Pengeluaran'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.handleInputChange({ target: { name: 'category', value: 'IN' } })}>
                                        Pemasukan
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleInputChange({ target: { name: 'category', value: 'OUT' } })}>
                                        Pengeluaran
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='success' onClick={this.handleSave}>
                            <i className='bi bi-check-circle'></i>
                        </Button>
                        <Button variant='danger' onClick={this.handleDelete}>
                            <i className='bi bi-trash'></i>
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        );
    }
}

export default EditModal;