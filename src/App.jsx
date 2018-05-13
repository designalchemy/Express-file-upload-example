import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import './styles/styles.scss'

class App extends React.Component {
  @observable file = false

  constructor(props) {
    super(props)
  }

  @action
  sendData = async e => {
    e.preventDefault()

    const formData = new FormData(this.form)

    const data = await fetch('http://localhost:5555/video', {
      method: 'POST',
      body: formData
    })

    const json = await data.json()

    this.file = json.fileName
  }

  render() {
    return (
      <div className="page_container">
        <form
          ref={ref => {
            this.form = ref
          }}
          encrypt="multipart/form-data"
        >
          <h1>
            {this.file
              ? `${this.file} uploaded to /fileUpload/`
              : 'No file uploaded'}
          </h1>

          <input type="file" name="file" />

          <button onClick={this.sendData}>Submit</button>
        </form>
      </div>
    )
  }
}

export default observer(App)
