const Theme = {
    Layout: {
        Corners: "0.25rem",
        Grid: "10rem"
    },
    Colors: {
        Primary: "#0082d5", // Blue
        Blue: "#0082d5",
        Green: "#04BE5B",
        Olive: "#9DBF16",
        Orange: "#FF9948",
        Red: "#D2335C",
        Purple: "#A93ABA"
    },
    Shades: {
        Darkest: "#374355",
        Darker: "#3d4d35",
        Dark: "#49556E",
        Medium: "#8493a8",
        Light: "#adb9ca",
        Lighter: "#cad3df",
        Lightest: "#eceff4",
        White: "#fafbfc"
    }
};

export function getColorFromProps(props) {

    if (props["blue"]) return Theme.Colors.Blue;
    if (props["green"]) return Theme.Colors.Green;
    if (props["olive"]) return Theme.Colors.Olive;
    if (props["orange"]) return Theme.Colors.Orange;
    if (props["red"]) return Theme.Colors.Red;
    if (props["purple"]) return Theme.Colors.Purple;

    return Theme.Shades.Lightest;
}

export function getBorderColorFromProps(props) {
     if (props["blue"]) return Theme.Colors.Blue;
    if (props["green"]) return Theme.Colors.Green;
    if (props["olive"]) return Theme.Colors.Olive;
    if (props["orange"]) return Theme.Colors.Orange;
    if (props["red"]) return Theme.Colors.Red;
    if (props["purple"]) return Theme.Colors.Purple;

    return Theme.Shades.Lighter;
}

export function getTextColorFromProps(props) {
    if (props["blue"]) return Theme.Shades.White;
    if (props["green"]) return Theme.Shades.White;
    if (props["olive"]) return Theme.Shades.White;
    if (props["orange"]) return Theme.Shades.White;
    if (props["red"]) return Theme.Shades.White;
    if (props["purple"]) return Theme.Shades.White;
    if (props["black"]) return Theme.Shades.White;

    return Theme.Shades.Dark;
}
// Stolen from
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
//
export function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

export default Theme;