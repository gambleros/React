React.renderComponent(
  React.createElement(PaymentApp, null),
  document.getElementById('app')
);

var Payment=React.createClass({displayName: "Payment",
  render: function () {
    return this.transferPropsTo(
      React.createElement("input", {type: "text"})
    );
  },
});

var PaymentApp=React.createClass({displayName: "PaymentApp",
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
      React.createElement("div", null, 
        React.createElement(Payment, {valueLink: this.linkState('payment')}), 
        React.createElement(Payment, {valueLink: this.linkState('payment2')}), 
        total
      )
    );
  },
});
