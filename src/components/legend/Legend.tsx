import {FC} from "react";
import './Legend.styles.scss';

const Legend: FC = () => {
    return <div className="legend-container">
        <div className="legend-item">
            <div className="legend-color aircraftCarrier"></div>
            <span>Aircraft Carrier</span>
        </div>
        <div className="legend-item">
            <div className="legend-color battleship"></div>
            <span>Battleship</span>
        </div>
        <div className="legend-item">
            <div className="legend-color cruiser"></div>
            <span>Cruiser</span>
        </div>
        <div className="legend-item">
            <div className="legend-color submarine"></div>
            <span>Submarine</span>
        </div>
        <div className="legend-item">
            <div className="legend-color destroyer"></div>
            <span>Destroyer</span>
        </div>
    </div>
}

export default Legend