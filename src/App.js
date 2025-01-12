

import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import DashBoard from './Components/DashBoard';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<DashBoard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
