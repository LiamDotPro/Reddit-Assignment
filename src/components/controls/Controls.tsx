import {FC} from "react";
import "./Controls.styles.scss"
import {ControlsInterfaces} from "./Controls.interfaces.ts";

const Controls: FC<ControlsInterfaces> = ({resetGame, setBoardStrategy, boardStrategy}) => {
    return <div className="controls-container">
        <button className="control-button" onClick={() => resetGame()}>Reset</button>
        <button className="control-button"
                onClick={() => setBoardStrategy()}>{boardStrategy ? "Set to Random" : "Set to Predefined"}</button>
    </div>
}

export default Controls