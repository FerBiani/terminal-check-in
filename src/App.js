import React, {Component} from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messageColor: '',
      codigo: '',
      loading: false,
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  enviarCodigo = async() => {

    this.setState({loading:true})

    try {

      if(this.state.codigo == '') {
        this.setState({
          message: 'Digite o código no campo abaixo',
          messageColor: 'red',
          loading:false
        })
        return false
      }

      const request = await axios.post('http://localhost/centromedico/public/api/check-in',
        { codigo: this.state.codigo },
        { headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        } 
      })

      this.setState({
        codigo: '',
        message: request.data,
        messageColor: '#28a745',
        loading:false
      })

    } catch(err) {

      this.setState({
        codigo: '',
        message: err.response.data,
        messageColor: 'red',
        loading:false
      })

    }

    setTimeout(() => {
      this.setState({
        message: ''
      })
    }, 3000)

  }

  render() {
    return (
      <div className="App">
        {this.state.message !== '' &&
            <p style={{backgroundColor: this.state.messageColor}} className="message">{this.state.message}</p>
        }
        <header className="App-header">
          <div className="form-box">
            {!this.state.loading ?
              <div>
                <form>
                  <div className="input-group">
                    <label className="label">Informe o seu código de check-in</label>
                    <input 
                      type="text"
                      id="codigo"
                      name="codigo"
                      className="input-text text-center"
                      value={this.state.codigo}
                      onChange={this.handleChange}/>
                  </div>
                </form>
                <div className="button-area">
                  <button 
                    className="success-button"
                    onClick={this.enviarCodigo}
                    >
                    Enviar
                  </button>
              
                </div>
              </div>
              :
                <img className="loading-image" src="loading.gif"/>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
