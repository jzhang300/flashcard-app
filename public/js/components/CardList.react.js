var React = require('react');
var Card = require('./Card.react');

var CardList = React.createClass({

  propTypes: {
    cards: React.PropTypes.array
  },

  getDefaultProps: function() {
    return [{
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
  },

  render: function() {
    var cards = [];

    for (var card in this.props.cards) {
      cards.push(<Card name={card.name} image={card.image} description={card.description}></Card>);
    }

    return (
      <div className="card-list">
        {cards}
      </div>
    );
  }

});

module.exports = CardList;