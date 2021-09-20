import React, { useState } from 'react';
import DichotomyUI from './components/DichotomyUI';
import IterationUI from './components/IterationUI';


function App() {
  const [ isDichotomy, setIsDichotomy ] = useState(true);

  return (
    <div className="container d-flex flex-column align-items-center">
      <div id="calculator" style={{width: 900, height: 400}}></div>

      <div className="mt-5">
        <div className="form-check form-check-inline me-5">
          <input checked={isDichotomy} onChange={e => setIsDichotomy(e.target.checked)} className="form-check-input" type="radio" name="inlineRadioOptions" id="dichotomy" value="option1" />
          <label className="form-check-label" htmlFor="dichotomy">Dichotomy</label>
        </div>
        <div className="form-check form-check-inline">
          <input checked={!isDichotomy} onChange={e => setIsDichotomy(!e.target.checked)} className="form-check-input" type="radio" name="inlineRadioOptions" id="iteration" value="option2" />
          <label className="form-check-label" htmlFor="iteration">Iteration</label>
        </div>    
      </div>

      <hr />

      { isDichotomy
      ? <DichotomyUI />
      : <IterationUI /> }
    </div>
  );
}

export default App;
