var React = require('react');
var CardList = require('./CardList.react');

var Main = React.createClass({

  render: function() {
    var cards = [{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    },{
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    }];

    return (
      <div>
        <CardList cards={cards}>
        </CardList>
      </div>
    );
  }

});

module.exports = Main;