/* global mapboxgl */

import LegendCtrl from '../widgets/LegendCtrl.js';
import EasyButton from '../widgets/EasyButtonCtrl.js';


export default function (map) {
    map.addControl(new EasyButton('custom_search', 'fa-search', 'Search'), 'top-right');
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new LegendCtrl(), 'bottom-right');
    map.addControl(new EasyButton('choose_theme', 'fa-bars', 'Select a Theme'), 'top-left');
    map.addControl(new EasyButton('view_table', 'fa-table', 'View a Data Table'), 'top-left');
    map.addControl(new EasyButton('view_chart', 'fa-line-chart', 'View a Chart'), 'top-left');
    map.addControl(new EasyButton('save_map', 'fa-floppy-o', 'Save a Map Image'), 'top-left');
    map.addControl(new EasyButton('clear_selection', 'fa-eraser', 'Clear Selection'), 'top-left');
}
