import { useNavigate } from "react-router-dom";
import framewonyoung from "../assets/templates/framewonyoung.png";
import framekarina from "../assets/templates/framekarina.png";
import "../styles/FrameSelection.css";

function FrameSelection() {
    const navigate = useNavigate();

    const selectFrame = (frame) => {
        localStorage.setItem("selectedFrame", frame);
        navigate("/camera");
    };
    return (
        <div className="frame-page">
            <h1>Choose Your Frame</h1>
            <p>Select your favorite photobooth frame</p>

            <div className="frame-grid">
                <div className="frame-card" onClick={() => selectFrame("framewonyoung")}>
                    <img src={framewonyoung} alt="Wonyoung Frame" />
                </div>

                <div className="frame-card" onClick={() => selectFrame("framekarina")}>
                    <img src={framekarina} alt="Karina Frame" />
                </div>
            </div>
        </div>
    );
}

export default FrameSelection;