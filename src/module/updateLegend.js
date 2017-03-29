import computed_breaks from './../json/computed_breaks.json';
import colortree from './../json/colortree.json';
import datatree from './../json/datatree.json';


export default function updateLegend(current_dropdown_value) {

    let legend_breaks = computed_breaks.acs1115[current_dropdown_value].jenks5;
    let colorscheme = colortree.mh1_5;
    let type = datatree.acs1115[current_dropdown_value].type;
    let default_color = '#fff';
    let title = datatree.acs1115[current_dropdown_value].title;

    let html_string = "<div class='legend-title-text'>" + title + "</div>"; // inner HTML to be inserted into legend

    for (let i = legend_breaks.length - 1; i > -1; i--) {
        html_string += '<div><span class="legend-box" style="background-color:' + colorscheme[i] +
            ';"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + formatValue(legend_breaks[i], type) + '</div>';
    }

    // default color
    html_string += '<div><span class="legend-box" style="background-color:' + default_color +
        ';"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;&nbsp;' + formatValue(legend_breaks[0], type) + '</div>';

    document.getElementById('legend-ctrl').innerHTML = html_string;

}


function formatValue(val, type) {

    if (type === 'currency') {
        return ' $' + val.toLocaleString();
    }
    if (type === 'number') {
        return val.toLocaleString();
    }
}
