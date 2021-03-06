var React = require('react');

var Card = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    image: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
        name: 'Card Name',
        image: 'brick.png',
        description: 'This is a description about cards.  This is a description about cards.  This is a description about cards. This is another description.',
    };
  },

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
            {this.props.name}
          </h3>
          <img className="card--image" src={this.props.image}/>
        </div>
        <div className="card--back">
          <p className="base--p card--description">
            {this.props.description}
          </p>
        </div>
      </div>
    );
  }

});

module.exports = Card;