
import computed_breaks from './../json/computed_breaks.json';

export default function updateLegend (current_dropdown_value) {
    
    let legend_breaks = computed_breaks[current_dropdown_value].array;
    let type = computed_breaks[current_dropdown_value].type;
    let default_color = computed_breaks[current_dropdown_value].default_color;
    
    let html_string = "";  // inner HTML to be inserted into legend
    
    for (let i=legend_breaks.length-1; i>-1; i--) {
        html_string += '<div><span class="legend-box" style="background-color:' + legend_breaks[i].color +
        ';"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + formatValue(legend_breaks[i].break, type) + '</div>';
    }
    
    // default color
    html_string += '<div><span class="legend-box" style="background-color:' + default_color +
        ';"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&nbsp;' + formatValue(legend_breaks[0].break, type) + '</div>';
    
    document.getElementById('legend-ctrl').innerHTML = html_string;
    
}


function formatValue (val, type) {
    
    if (type === 'currency') {
        return ' $' + val.toLocaleString();
    }
    
}