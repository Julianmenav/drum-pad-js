//Componente para cada botón
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: "gray"
    }
    this.handleClick = this.handleClick.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleClick() {
    this.playSound()
    this.changeColor()
    this.props.handler(this.props.ids)
  }
  playSound() {
    let sound = document.getElementById(this.props.keyTrigger)
    sound.load();
    sound.play();
  }
  changeColor() {
    this.setState({ bgColor: "orange" })
    setTimeout(() => this.setState({ bgColor: "gray" }), 100)
  }
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound()
      this.changeColor()
      this.props.handler(this.props.ids)
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }



  render() {
    return (
      <button
        style={{ backgroundColor: this.state.bgColor }}
        className="drum-pad"
        id={this.props.ids}
        onClick={this.handleClick}>
        <b>{this.props.keyTrigger}</b>
        <audio
          src={this.props.url}
          class="clip"
          id={this.props.keyTrigger}
        />
      </button>
    )
  }
}



class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      display: "-"
    }
    this.displayHandler = this.displayHandler.bind(this);
  }
  displayHandler(soundId) {
    this.setState({
      display: soundId
    })
  }
  render() {
    const buttons = sounds.map((el, idx) => {
      return <DrumPad
        key={idx}
        ids={el.id}
        url={el.url}
        keyTrigger={el.keyTrigger}
        keyCode={el.keyCode}
        handler={this.displayHandler}
      />
    })

    return (
      <div className="container">
        <div id="display" className="display">
          {this.state.display}
        </div>
        {buttons}

      </div>
    )
  }
}

//9 sonidos a mapear
const sounds = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

ReactDOM.render(<App />, document.getElementById("drum-machine"))