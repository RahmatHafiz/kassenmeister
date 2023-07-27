import React from "react";
import { Modal, Button } from 'react-bootstrap';
import '../App.css'

class ModalCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            deskripsi: '',
            nominal: 0,
            tanggal: '',
            category: ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.tambahItem = this.tambahItem.bind(this);
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleShow() {
        this.setState({
            show: true,
            category: this.props.category
        })
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    tambahItem() {
        const { deskripsi, nominal, tanggal, category } = this.state;
        if (!deskripsi || !nominal || !tanggal) {
            alert("Mohon isi semua field.");
            return;
        }

        const Data = {
            deskripsi: deskripsi,
            nominal: parseFloat(nominal),
            tanggal: tanggal,
            category: category,
        };

        const fnTambahItem = this.props.action;
        fnTambahItem(Data);
        this.setState({
            show: false,
            deskripsi: '',
            nominal: 0,
            tanggal: '',
        });
    }

    render() {
        return (
            <>
                <button onClick={this.handleShow} className={this.props.variant}>{this.props.text} <i className={this.props.icon}></i></button>

                <Modal show={this.state.show} onHide={this.handleClose} centered className="modal-create">
                    <div className="modal-content">
                        <Modal.Header closeButton>
                            <Modal.Title className="modal-heading">{this.props.modalheading}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="mb-3">
                                <label className="form-label">Deskripsi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Masukkan Deskripsi"
                                    name="deskripsi"
                                    value={this.state.deskripsi}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nominal</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Masukkan Nominal"
                                    name="nominal"
                                    value={this.state.nominal}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tanggal</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Masukkan Tanggal"
                                    name="tanggal"
                                    value={this.state.tanggal}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="hidden"
                                    className="form-control"
                                    name="category"
                                    value={this.state.category}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="success" onClick={this.tambahItem}>
                                <i className="bi bi-check-circle"></i>
                            </Button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </>
        );
    }
}

export default ModalCreate;