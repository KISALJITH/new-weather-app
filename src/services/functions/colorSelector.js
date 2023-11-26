import {COLORS} from "../../constants/constant";

//function change background color
export function RandomColor() {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    const randomColor = COLORS[randomIndex];
    return randomColor;
}