var React=require('react/addons'),
    Payment= require('./payment');

var PaymentApp=React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {
       payment: 0,
       payment2: 0,
    };
  },
  render: function () {
    var total=parseInt(this.state.payment,10)+parseInt(this.state.payment2,10);
    return (
      <div>
        <Payment valueLink={this.linkState('payment')} />
        <Payment valueLink={this.linkState('payment2')} />
        {total}
      </div>
    );
  },
});
module.exports.paymentApp = PaymentApp;