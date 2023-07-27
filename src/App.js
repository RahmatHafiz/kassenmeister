import './App.css';
import React from 'react';
import ModalCreate from './component/ModalCreate';
import Alert from './component/Alert';
import TransactionItem from './component/TransactionItem';
import EditModal from './component/EditModal';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sisaUang: 0,
      persantaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [],
      showEditModal: false,
      editTransactionIndex: null,
    };
    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  saveToLocalStorage = () => {
    localStorage.setItem('summaryData', JSON.stringify(this.state.summary));
  };

  loadFromLocalStorage = () => {
    const summaryData = JSON.parse(localStorage.getItem('summaryData'));
    if (summaryData) {
      this.setState({ summary: summaryData }, () => {
        this.fnHitung();
      });
    }
  };

  formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  tambahItem(objek) {
    let newData = [...this.state.summary, objek];
    newData.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    let dataUangIN = newData.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num, 0);
    let dataUangOUT = newData.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    this.setState(
      {
        pemasukanUang: jumlahUangIN,
        transaksiIN: nominalUang.length,
        pengeluaranUang: jumlahUangOUT,
        transaksiOUT: nominalUangOUT.length,
        sisaUang: jumlahUangIN - jumlahUangOUT,
        persantaseUang: ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100,
        summary: newData
      },
      () => {
        this.saveToLocalStorage();
      }
    );
  }

  fnHitung() {
    let dataUangIN = this.state.summary.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num, 0);
    let dataUangOUT = this.state.summary.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    let persentaseUang = jumlahUangIN !== 0 ? ((jumlahUangIN - jumlahUangOUT) / jumlahUangIN) * 100 : 0;
    if (jumlahUangIN === 0) {
      persentaseUang = 0;
    }

    this.setState({
      pemasukanUang: jumlahUangIN,
      transaksiIN: nominalUang.length,
      pengeluaranUang: jumlahUangOUT,
      transaksiOUT: nominalUangOUT.length,
      sisaUang: jumlahUangIN - jumlahUangOUT,
      persantaseUang: persentaseUang
    });
  }


  componentDidMount() {
    if (this.state.summary.length < 1) {
      this.loadFromLocalStorage();
      this.setState({
        sisaUang: 0,
        persantaseUang: 0
      });
    } else {
      this.fnHitung();
    }
  }


  updateTransaction = (index, updatedTransaction) => {
    const { summary } = this.state;
    const updatedSummary = [...summary];
    updatedSummary[index] = updatedTransaction;
    updatedSummary.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

    this.setState({ summary: updatedSummary }, () => {
      this.fnHitung();
      this.saveToLocalStorage();
    });

    this.handleEditModalClose();
  };

  deleteTransaction = (transactionToDelete) => {
    const { summary } = this.state;
    const updatedSummary = summary.filter((transaction) => transaction !== transactionToDelete);

    this.setState({ summary: updatedSummary }, () => {
      this.fnHitung();
      this.saveToLocalStorage();
    });
  };

  handleEditModalClose = () => {
    this.setState({ showEditModal: false, editTransactionIndex: null });
  };

  formatCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID');
    return formatter.format(amount);
  };


  render() {
    const { showEditModal, editTransactionIndex, summary } = this.state;
    return (
      <>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1 className='fw-bold'>KassenMeister</h1>
              <hr className='w-75 mx-auto' />
              <h2 className='fw-bold'>Rp. {this.formatCurrency(this.state.sisaUang)} ,-</h2>
              <span className='title-md'>Sisa uang kamu tersisa <span className="warna-sisa">{this.state.persantaseUang}%</span> lagi.</span>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper-in mb-1'>
                  <i className='bi bi-wallet2'></i>
                </div>
                <span className='title-sm'>Pemasukan</span>
                <h3 className='fw-bold'>Rp. {this.formatCurrency(this.state.pemasukanUang)} ,-</h3>
                <div>
                  <span className='title-sm text-ungu fw-bold'>{this.formatCurrency(this.state.transaksiIN)}</span>
                  <span className='title-sm'> Transaksi</span>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper-out mb-1'>
                  <i className='bi bi-cash-stack'></i>
                </div>
                <span className='title-sm'>Pengeluaran</span>
                <h3 className='fw-bold'>Rp. {this.formatCurrency(this.state.pengeluaranUang)} ,-</h3>
                <div>
                  <span className='title-sm text-pink fw-bold'>{this.formatCurrency(this.state.transaksiOUT)}</span>
                  <span className='title-sm'> Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-5'>
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <h4>Ringkasan Transaksi</h4>
              <div className='wrapper-button d-flex'>
                <ModalCreate
                  action={this.tambahItem}
                  category='IN'
                  variant='button btn-ungu px-3 py-2 me-2'
                  text='Pemasukan'
                  icon='bi bi-plus-circle-fill'
                  modalheading='Tambahkan Pemasukan'
                />
                <ModalCreate
                  action={this.tambahItem}
                  category='OUT'
                  variant='button btn-pink px-3 py-2'
                  text='Pengeluaran'
                  icon='bi bi-dash-circle-fill'
                  modalheading='Tambahkan Pengeluaran'
                />
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            {summary.length < 1 && <Alert />}
            {summary.map((sum, index) => (
              <TransactionItem
                key={index}
                index={index}
                transaction={sum}
                formatDate={this.formatDate}
                onEdit={() => this.setState({ showEditModal: true, editTransactionIndex: index })}
              />
            ))}
          </div>
        </div>

        {showEditModal && editTransactionIndex !== null && (
          <EditModal
            transaction={summary[editTransactionIndex]}
            formatDate={this.formatDate}
            onClose={() => this.setState({ showEditModal: false, editTransactionIndex: null })}
            onSave={(updatedTransaction) => this.updateTransaction(editTransactionIndex, updatedTransaction)}
            onDelete={this.deleteTransaction}
          />
        )}
      </>
    );
  }
}

export function formatCurrency(amount) {
  return amount.toLocaleString('id-ID');
}

export default App;