import { Component } from '@angular/core';
declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html'
})
export class PaypalComponent {
  public titulo: string;
  public config;
  public valorPagar: number;
  public valor: String;

  constructor() {
    this.titulo = 'PayPal';
    this.valorPagar = 0.01;
  }

  getConfiguracionPaypal() {
    this.valor = this.valorPagar.toFixed(2);
    console.log(this.valor);
    return  {
      env: 'sandbox',

      client: {
        sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: 'AV0RNaMSovoh36kX9ZMlPlsbHkIsy5DH7omIUsIgev9EgzdgE61dd84prRNdiV91k7GcbfuKKyrLGZQc',
      },
      commit: true,
      payment: function(data, actions) {
        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount: { total: this.valor , currency: 'USD' }
              }
            ]
          }
        });
      },
      onAuthorize: function(data, actions) {
        return actions.payment.execute().then(() => {
          alert('Pago Completado');
          console.log('Pago Completado');
        });
      }

    };
  }

  getCheckout() {
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });

  }

  getPagar() {
    this.getCheckout().then(() => {
      paypal.Button.render(this.getConfiguracionPaypal(), '#paypal-button-container');
    });
  }
}
