var React = require('react');

var Card = React.createClass({

  getInitialState: function() {
    return {
        card: 'card'
    };
  },

  render: function() {
    return (
      <div className="card">
        <div className="card--front">
          <h3 className="base--h3 card--name">
            Card Name
          </h3>
          <img className="card--image" src="brick.png"/>
        </div>
        <div className="card--back">
          <p className="base--p card--description">
            This is a description about cards.  This is a description about cards.  This is a description about cards.  
          </p>
        </div>
      </div>
    );
  }

});

module.exports = Card;