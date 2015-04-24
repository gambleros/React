var React=require('react');

var Payment=React.createClass({
  render: function () {
    return this.transferPropsTo(
      <input type="text"/>
    );
  },
});
module.exports = Payment;