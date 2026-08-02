import { useState, useEffect } from "react";
import "./marksheet.css";

function MarkSheet() {
    const [marks, setMarks] = useState({ math: 50, chemistry: 60, physics: 70 });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalMarks = Object.values(marks).reduce((sum, value) => sum + value, 0);
        setTotal(totalMarks);
    }, [marks]);

    return (
        <div className="body-content">
            <div className="marksheet-container">
                <div className="header-row">
                    <h1>Mark Sheet</h1>
                </div>

                <div className="student-info">
                    <p><span>Name</span>John Doe</p>
                    <p><span>Age</span>20</p>
                </div>

                <div className="subject-marks">
                    <div className="subject-row">
                        <span>Math</span>
                        <strong>{marks.math}</strong>
                    </div>
                    <div className="subject-row">
                        <span>Chemistry</span>
                        <strong>{marks.chemistry}</strong>
                    </div>
                    <div className="subject-row">
                        <span>Physics</span>
                        <strong>{marks.physics}</strong>
                    </div>
                </div>

                <div className="total-marks">
                    <p>Total Score: {total}</p>
                </div>

                <div className="action-buttons">
                    <button onClick={() => setMarks({ math: 50, chemistry: 60, physics: 70 })} className="secondary">
                        Reset Marks
                    </button>
                    <button onClick={() => setMarks({ math: marks.math + 10, chemistry: marks.chemistry + 10, physics: marks.physics + 10 })}  className="primary">
                        Update Marks
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MarkSheet;