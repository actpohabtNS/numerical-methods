import React, { useState } from 'react'

const defA = 1,
      defB = 2,
      defX0 = 0,
      defEpsilon = 1e-4;

const RANGE_EPSILON = 1e-10;


const IterationUI = () => {
    const [ a, setA ] = useState(defA);
    const [ b, setB ] = useState(defB);
    const [ x0, setX0 ] = useState(defX0);
    const [ epsilon, setEpsilon ] = useState(defEpsilon)

    return (
        <form className="d-flex flex-column align-items-center">
            <h3 className="mb-4">Select x range [a, b]:</h3>

            <div className="row g-3 align-items-center mb-4">
                <div className="col-auto">
                    <label htmlFor="range-a" className="col-form-label">a:</label>
                </div>
                <div className="col-auto me-5">
                    <input
                        value={a}
                        onChange={e => setA(e.target.valueAsNumber)}
                        defaultValue={defA}
                        step={RANGE_EPSILON}
                        max={b}
                        type="number" id="range-a" className="form-control"
                    />
                </div>

                <div className="col-auto">
                    <label htmlFor="range-b" className="col-form-label">b:</label>
                </div>
                <div className="col-auto">
                    <input
                        onChange={e => setB(e.target.valueAsNumber)}
                        defaultValue={defB}
                        step={RANGE_EPSILON}
                        min={a}
                        type="number" id="range-b" className="form-control"
                    />
                </div>
            </div>

            <div className="row g-3 align-items-center mb-4">
                <div className="col-auto">
                    <label htmlFor="x0" className="col-form-label">Set x0:</label>
                </div>
                <div className="col-auto me-5">
                    <input
                        value={x0}
                        onChange={e => setX0(e.target.valueAsNumber)}
                        defaultValue={defX0}
                        step={defEpsilon}
                        type="number" id="x0" className="form-control"
                    />
                </div>

                <div className="col-auto">
                    <label htmlFor="epsilon" className="col-form-label">Set epsilon:</label>
                </div>
                <div className="col-auto">
                    <input
                        value={epsilon}
                        onChange={e => setEpsilon(e.target.valueAsNumber)}
                        defaultValue={defEpsilon}
                        step={defEpsilon}
                        type="number" id="epsilon" className="form-control"
                    />
                </div>
            </div>

            <button
                type="submit" className="btn btn-success px-5"
            >
                Run
            </button>
        </form> 
    )
}

export default IterationUI;