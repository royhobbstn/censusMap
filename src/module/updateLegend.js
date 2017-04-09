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

    let html_string = "<div class='legend-title-text'>" + title + "</div><table>"; // inner HTML to be inserted into legend

    for (let i = legend_breaks.length - 1; i > -1; i--) {
        html_string += '<tr><td class="t-pad-sides"><div class="legend-box" style="background-color:' + colorscheme[i] +
            ';"></div></td><td class="t-pad-sides"></td><td class="t-align-right">' + formatValue(legend_breaks[i], type) + '</td><td class="t-pad-sides">' + ((i === legend_breaks.length - 1) ? '+' : '') + '</td></tr>';
    }

    // default color
    html_string += '<tr><td class="t-pad-sides"><div class="legend-box" style="background-color:' + default_color +
        ';"></div></td><td class="t-pad-sides">&lt;</td><td class="t-align-right">' + formatValue(legend_breaks[0], type) + '</td><td class="t-pad-sides"></td></tr></table>';

    document.getElementById('legend-ctrl').innerHTML = html_string;

}


function formatValue(val, type) {

    if (type === 'currency') {
        return ' $' + val.toLocaleString(); // add currency and thousands comma
    }
    if (type === 'number') {
        return val.toLocaleString(); // add thousands comma
    }
    if (type === 'regular') {
        return val; // no formatting
    }
}
