var React = require('react'),
    ShowAddButton=require('./ShowAddButton'),
    FeedForm=require('./FeedForm'),
    FeedList=require('./FeedList'),
    _=require('lodash'),
    Firebase=require('firebase');
var Feed = React.createClass({
  loadData: function () {
    var ref=new Firebase('https://examplevoteapp.firebaseio.com/feed');
    ref.on('value',function (snap) {
      var itemZ= [],
          sorted=[];
      snap.forEach(function (itemSnap) {
        var item=itemSnap.val();
        item.keys=itemSnap.key();
        itemZ.push(item);
      });
      sorted=_.sortBy(itemZ,function (item) {
        return -item.voteCount;
      })
      this.setState({
        items: sorted
      });
    }.bind(this));
  },
  componentDidMount: function() {
    this.loadData();
  },
  getInitialState: function() {
    return {
      items: [],
      formDisplayed: false
    };
  },
  onToggleForm: function () {
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });
  },
  onNewItem: function (newItem) {
    var ref=new Firebase('https://examplevoteapp.firebaseio.com/feed');
    ref.push(newItem);
    // newItem.keys=this.state.items.length.toString();
    // var newItems=this.state.items.concat([newItem]);
    // this.setState({
    //   items: newItems,
    //   formDisplayed:false,
    // });
  },
  onVote: function (item) {
    var ref=new Firebase('https://examplevoteapp.firebaseio.com/feed').child(item.keys);
    ref.update(item);
    // var items=_.uniq(this.state.items);
    // var index=_.findIndex(items,function (feedItems) {
    //   return feedItems.keys===item.keys;
    // });
    // var oldObj=items[index];
    // var newItems=_.pull(items,oldObj);
    // newItems.splice(index,0,item);
    // this.setState({
    //   items:newItems
    // });
  },
  render: function() {
    return (
      <div>
        <div className="container">
          <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm}/>
        </div>

        <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem}/>

        <br />
        <br />

        <FeedList items={this.state.items} onVote={this.onVote} />

      </div>
    );
  }

});

module.exports = Feed;
