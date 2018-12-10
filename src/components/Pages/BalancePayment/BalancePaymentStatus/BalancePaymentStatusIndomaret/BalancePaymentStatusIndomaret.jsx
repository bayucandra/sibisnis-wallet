import React, { Component } from 'react';
import * as JsBarcode from 'jsbarcode';

import biqHelper from "../../../../../lib/biqHelper";

import {Button} from "components/Widgets/material-ui";
import BiqModal from "../../../../Widgets/BiqModal/BiqModal";

import "./BalancePaymentStatusIndomaret.scss";

import iconIndomaret from "images/icons/payment/indomaret@3x.png";

class BalancePaymentStatusIndomaret extends Component {

  state = {
    detail_order_show_mobile: false
  };

  _detailOrderShow = () => {
    biqHelper.utils.clickTimeout( () => {
      this.setState({detail_order_show_mobile: true});
    } );
  };

  _detailOrderHide = () => {
    biqHelper.utils.clickTimeout( () => {
      this.setState({detail_order_show_mobile: false});
    } );
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    JsBarcode( '#indomaret-barcode', this.props.biqData.kode_bayar, {
      format: 'CODE128',
      displayValue: false,
      height: 60
    } );
  }

  render() {
    let data = this.props.biqData;

    return (
      <div className="balance-payment-status-indomaret">

        {
          data.status !== '3' ?
            <div className="expiration-notice">

              <div className="expiration-notice__icon"/>

              <div className="expiration-notice__time">

                <div className="notice">Silakan selesaikan pembayaran Anda di Indomaret sebelum</div>

                <div className="time">
                  <span>{this.props.countDown.hours}</span> jam &nbsp;<div>:</div> &nbsp;<span>{this.props.countDown.minutes}</span> menit &nbsp;<div>:</div> &nbsp;<span>{this.props.countDown.seconds}</span> detik
                </div>

              </div>

            </div>
            :

            <div className="notice-expired hidden-md-up">
              <div className="notice-expired__icon"/>
              <div className="notice-expired__text">Waktu Kadaluwarsa</div>
            </div>
        }

        {
          data.status === '3' ?
            <div style={{ height: '10px' }} className={"visible-md-up"}/>
            :
            ''
        }

        <Button className="detail-btn-mobile hidden-md-up" onClick={this._detailOrderShow}>Detail Pembayaran</Button>

        <div className="barcode">
          <div className="barcode__text">
            <div className="label">Kode Bayar</div>
            <div className="value">{data.kode_bayar}</div>
          </div>
          <div className="barcode__image">
            <svg id="indomaret-barcode"/>
          </div>
        </div>

        <div className="guide">

          <div className="guide__title">Langkah pembayaran</div>

          <ul className="guide__list">
            <li>Datang ke Gerai Indomaret terdekat dan Tunjukkan ke kasir kode barcode diatas.</li>
            <li>Kasir akan melakukan konfirmasi jumlah pembayaran</li>
            <li>Silahkan membayar sesuai data yang tertera dan sesuai data Kasir</li>
            <li>Setelah pembayaran berhasil dilakukan melalui gerai Indomaret anda akan mendapatkan konfirmasi melalui Email</li>
            <li>Simpan bukti bayar dari Indomaret untuk referensi kamu</li>
          </ul>

        </div>

        <div className="action-footer">
          <Button className="back-to-home-btn">Kembali ke Home</Button>
        </div>
        {
          this.state.detail_order_show_mobile && biqHelper.mediaQuery.isMobile() &&
          <BiqModal>

            <div className="detail-order-popup-mobile">

              <div className="header">
                <div className="label">Detail Pembayaran</div>
                <Button className="close-btn" onClick={this._detailOrderHide}>&nbsp;</Button>
              </div>

              <div className="body">

                <div className="detail-payment">

                  <div className="detail-payment__panel">

                    <div className="biq-row">
                      <div className="label">Metode bayar</div>
                      <div className="value"><img src={iconIndomaret} alt={"Indomaret"} style={{ width:'70px', height: 'auto' }}/></div>
                    </div>

                    <div className="biq-row">
                      <div className="label">Sub Total</div>
                      <div className="value">{ biqHelper.utils.numberFormat( 200000, 'Rp ' ) }</div>
                    </div>

                    <div className="biq-row">
                      <div className="label">Biaya Layanan</div>
                      <div className="value">{ biqHelper.utils.numberFormat( 7800, 'Rp ' ) }</div>
                    </div>

                    <div className="biq-row biq-row--total">
                      <div className="label">Total</div>
                      <div className="value">{ biqHelper.utils.numberFormat( (200000 + 7800), 'Rp ' ) }</div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </BiqModal>
        }
      </div>
    );

  }

}

export default BalancePaymentStatusIndomaret;