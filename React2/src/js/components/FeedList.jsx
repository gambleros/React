var React = require('react'),
    FeedItem=require('./FeedItem');

var FeedList = React.createClass({

  render: function() {
    var feedItems=this.props.items.map(function (item) {
      return <FeedItem title={item.title}
                       keys={item.keys}
                       key={item.keys}
                       desc={item.description}
                       voteCount={item.voteCount}
                       onVote={this.props.onVote} />
                   }.bind(this));
    return (
      <ul className="list-group container">
        {feedItems}
      </ul>
    );
  }

});

module.exports = FeedList;
