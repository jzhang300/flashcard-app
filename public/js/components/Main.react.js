var React = require('react');
var Card = require('./Card.react');
var Card_flip= require('./Card_flip.react');

var Main = React.createClass({

  render: function() {
    var card = {
      name: 'Hello World',
      image: 'brick.png',
      description: 'Greetings, this is a test description.'
    };

    return (
      <div>
        <Card name={card.name} image={card.image} description={card.description}>
        </Card>
        <Card_flip name={card.name} image={card.image} description={card.description}>
        </Card_flip>
      </div>
    );
  }

});

module.exports = Main;