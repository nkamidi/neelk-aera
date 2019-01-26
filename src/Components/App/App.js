import React, {Component} from 'react';
import './App.css';
import Devices from '../Devices/Devices';
import NavBar from '../Navbar/Navbar';


class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Devices/>
            </div>
        );
    }
}

export default App;
