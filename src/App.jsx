import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Slider from './Slider';
// import { Route, Router, Routes } from 'react-router-dom';
// import QuizPage from './QuizPage';

function App() {

  return (
    <>
      {/* <Router> */}
        <Header />
      
        <div>
         <Slider />
        </div>

        {/* <Routes>
         <Route path="/" />
         <Route path="/quiz" element={<QuizPage />} />
         <Route path="/quiz/:game" element={<QuizPage />} />
        </Routes> */}

      {/* </Router> */}
    </>
  )
}

export default App;
