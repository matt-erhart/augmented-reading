import * as React from 'react'

import logo from './logo.svg'


class App extends React.Component {
  public render() {
    return (
      <div >
        <img src={logo}  alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.asdf
        </p>
        <a
         href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    )
  }
}

export default App
