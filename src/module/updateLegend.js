import computed_breaks from './../json/computed_breaks.json';
import colortree from './../json/colortree.json';
import datatree from './../json/datatree.json';


export default function updateLegend(current_dropdown_value) {

    let breaks_style = datatree.acs1115[current_dropdown_value].favstyle[0] + datatree.acs1115[current_dropdown_value].favstyle[1];
    let legend_breaks = computed_breaks.acs1115[current_dropdown_value].county[breaks_style];

    let color_style = datatree.acs1115[current_dropdown_value].favstyle[2] + '_' + datatree.acs1115[current_dropdown_value].favstyle[1];
    let colorscheme = colortree[color_style];

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
