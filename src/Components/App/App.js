import React, {Component} from 'react';
import './App.css';
import Books from '../Books/Books';
import NavBar from '../Navbar/Navbar';


class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <Books/>
            </div>
        );
    }
}

export default App;
