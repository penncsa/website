import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_AUTH_TOKEN
const BOARD_BIOS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1JFxst835z4w-xhz8y9x7y7cnrmeHvk3Fb1cNV7ncayQ/values/board_bios?alt=json&key=${GOOGLE_SHEETS_API_KEY}`

function bioParser(bios) {
  var i
  var new_bios = []
  for (i = 0; i < bios.length; i++) {
    var curr_bio = {}

    curr_bio['email'] = bios[i][0]
    curr_bio['name'] = bios[i][1]
    curr_bio['grad_year'] = bios[i][2]
    curr_bio['school'] = bios[i][3]
    curr_bio['majors'] = bios[i][4]
    curr_bio['commitments'] = bios[i][5]
    curr_bio['hobbies'] = bios[i][6]
    curr_bio['position'] = bios[i][7]
    curr_bio['fb_url'] = bios[i][8]
    curr_bio['ig_url'] = bios[i][9]
    curr_bio['profile'] = bios[i][10]

    new_bios.push(curr_bio)
  }
  new_bios.shift()
  return new_bios
}

class Board extends Component {
  state = {
    bios: [],
  }

  componentDidMount() {
    fetch(BOARD_BIOS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => bioParser(data.values))
      .then((data) => {
        this.setState({ bios: data })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div className='board section' id='board'>
        <h1>Board</h1>
        <p>Meet board #116! Click on our cards to learn more about us.</p>
        <div className='board-bios'>
          <BioCollection data={this.state.bios} />
        </div>
        {/* <div id="coffee-chat">
                    <p>Want to learn more about joining board?</p>
                    <p><u>Reach out for a coffee chat</u>.</p>
                </div> */}
      </div>
    )
  }
}

class BioCollection extends Component {
  state = {
    showModal: false,
    dataModal: {
      name: '',
    },
  }
  getModal = (data) => {
    this.setState({ showModal: true, dataModal: data })
  }
  hideModal = () => {
    this.setState({ showModal: false })
  }
  render() {
    return (
      <div>
        <div className='board-cards'>
          {this.props.data.map((data, key) => (
            <div key={key} className='small'>
              <div className='card' onClick={() => this.getModal(data)}>
                <img className='card-img' src={data.profile} alt=''></img>
                <h4>{data.name}</h4>
                <h5>{data.position}</h5>
              </div>
            </div>
          ))}
        </div>
        <Bio
          show={this.state.showModal}
          onHide={this.hideModal}
          dataModal={this.state.dataModal}
          description={<b>TEST</b>}
        />
      </div>
    )
  }
}

class Bio extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          {this.props.show && (
            <div className='modal'>
              <div className='modal-main fade-in'>
                <div className='modal-content'>
                  <div className='modal-text'>
                    <h2>{this.props.dataModal.name}</h2>
                    <p>
                      <b>Email:</b>{' '}
                      <a href={'mailto:' + this.props.dataModal.email}>
                        {this.props.dataModal.email}
                      </a>
                    </p>
                    <p>
                      <b>School:</b> {this.props.dataModal.school}{' '}
                      {this.props.dataModal.grad_year}
                    </p>
                    <p>
                      <b>Commitments/Clubs:</b>{' '}
                      {this.props.dataModal.commitments}
                    </p>
                    <p>
                      <b>Hobbies:</b> {this.props.dataModal.hobbies}
                    </p>
                  </div>
                  <div className='modal-img'>
                    <img src={this.props.dataModal.profile} alt=''></img>
                  </div>
                </div>
                <div className='close-btn-wrapper'>
                  <button className='close-btn' onClick={this.props.onHide}>
                    Close
                  </button>
                  {this.props.dataModal.fb_url && (
                    <a
                      href={this.props.dataModal.fb_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <div id='facebook'>
                        <FontAwesomeIcon icon={faFacebook} />
                      </div>
                    </a>
                  )}
                  {this.props.dataModal.ig_url && (
                    <a
                      href={this.props.dataModal.ig_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <div id='instagram'>
                        <FontAwesomeIcon icon={faInstagram} />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      </div>
    )
  }
}

export default Board
