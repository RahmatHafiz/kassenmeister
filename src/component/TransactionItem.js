import React from 'react';
import { formatCurrency } from '../App.js';

class TransactionItem extends React.Component {
    render() {
        const { transaction, formatDate, onEdit } = this.props;
        return (
            <div className='mb-3 col-12'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex align-items-center'>
                        <div className={transaction.category === 'IN' ? 'icon-wrapper-in' : 'icon-wrapper-out'}>
                            <i className={transaction.category === 'IN' ? 'bi bi-wallet2' : 'bi bi-bag-dash'}></i>
                        </div>
                        <div className='transcation ms-3 d-flex flex-column'>
                            <h6>{transaction.deskripsi}</h6>
                            <span className='title-sm'>{formatDate(transaction.tanggal)}</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <h5 className={transaction.category === 'IN' ? 'text-money-in' : 'text-money-out'}>
                            {transaction.category === 'OUT' ? '-' : '+'} Rp. {formatCurrency(Math.abs(transaction.nominal))} ,-
                        </h5>
                        <button className='btn btn-sm btn-light ms-2' onClick={onEdit}>
                            <i className='bi bi-pencil-square'></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TransactionItem;