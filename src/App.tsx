import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import { Commands } from './routes/commands/commands';
import { Home } from './routes/home/home';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Router>
                    <>
                        <Navbar />
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/commands" component={Commands} />
                    </>
                </Router>
            </div>
        );
    }
}

export default App;
