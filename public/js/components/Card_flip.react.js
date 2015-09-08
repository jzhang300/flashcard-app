var React = require('react');

var Card_flip = React.createClass({

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
      <div className="card-flip">
        <div className="card-flip--front">
          <h3 className="base--h3 card-flip--name">
            {this.props.name}
          </h3>
        </div>
        <div className="card-flip--front-back">
          <img className="card-flip--image" src={this.props.image}/>
        </div>
        <div className="card-flip--back">
          <p className="base--p card-flip--description">
            {this.props.description}
          </p>
        </div>
      </div>
    );
  }

});

module.exports = Card_flip;