"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "acs1115": {

        "mhi": {
            "title": "Median Household Income",
            "table": "b19013",
            "section": "Income",
            "expression": ["b19013001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Household Income",
            "favstyle": ["jenks", "7", "mh1"],
            "bg": "yes"
        },

        "mhv": {
            "title": "Median Home Value",
            "section": "Housing",
            "table": "b25077",
            "expression": ["b25077001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Home Value",
            "favstyle": ["jenks", "7", "mh2"],
            "bg": "yes"
        },

        "mfi": {
            "title": "Median Family Income",
            "section": "Income",
            "table": "b19113",
            "expression": ["b19113001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Family Income",
            "favstyle": ["jenks", "7", "mh3"],
            "bg": "yes"
        },

        "pci": {
            "title": "Per Capita Income",
            "section": "Income",
            "table": "b19301",
            "expression": ["b19301001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Per Capita Income",
            "favstyle": ["jenks", "7", "mh4"],
            "bg": "yes"
        },

        "myb": {
            "title": "Median Year Housing Unit Built",
            "section": "Housing",
            "table": "b25035",
            "expression": ["b25035001"],
            "type": "regular",
            "minval": "1939",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Year Built",
            "favstyle": ["jenks", "7", "mh5"],
            "bg": "yes"
        },

        "pop": {
            "title": "Total Population",
            "section": "Population",
            "table": "b01001",
            "expression": ["b01001001"],
            "type": "number",
            "minval": "0",
            "mininc": "1",
            "usezeroasnull": "no",
            "favtable": "Basic Population (total)",
            "favstyle": ["jenks", "7", "mh7"],
            "bg": "yes"
        },

        "pcth": {
            "title": "Percent Hispanic",
            "section": "Race",
            "table": "b03002",
            "expression": ["b03002012", "/", "b03002001"],
            "type": "percent",
            "minval": "0",
            "mininc": ".01",
            "usezeroasnull": "no",
            "favtable": "Race-Ethnicity (percent)",
            "favstyle": ["jenks", "7", "mh6"],
            "bg": "yes"
        },

        "pctw": {
            "title": "Percent White",
            "section": "Race",
            "table": "b03002",
            "expression": ["b03002003", "/", "b03002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Race-Ethnicity (percent)",
            "favstyle": ["jenks", "7", "mh8"],
            "bg": "yes"
        },

        "pctb": {
            "title": "Percent Black",
            "section": "Race",
            "table": "b03002",
            "expression": ["b03002004", "/", "b03002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Race-Ethnicity (percent)",
            "favstyle": ["jenks", "7", "mh9"],
            "bg": "yes"
        },

        "pctna": {
            "title": "Percent Native American",
            "section": "Race",
            "table": "b03002",
            "expression": ["b03002005", "/", "b03002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Race-Ethnicity (percent)",
            "favstyle": ["jenks", "7", "sh1"],
            "bg": "yes"
        },

        "pctasian": {
            "title": "Percent Asian",
            "section": "Race",
            "table": "b03002",
            "expression": ["b03002006", "/", "b03002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Race-Ethnicity (percent)",
            "favstyle": ["jenks", "7", "sh2"],
            "bg": "yes"
        },

        "pcthaw": {
            "title": "Percent Hawaiian & PacIs",
            "section": "Race",
            "table": "b03002",
            "expression": ["b03002007", "/", "b03002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Race-Ethnicity (percent)",
            "favstyle": ["jenks", "7", "sh4"],
            "bg": "yes"
        },

        "pctmale": {
            "title": "Percent Male",
            "section": "Population",
            "table": "b01001",
            "expression": ["b01001002", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Male & Female (percent)",
            "favstyle": ["jenks", "7", "sh6"],
            "bg": "yes"
        },

        "pctfemale": {
            "title": "Percent Female",
            "section": "Population",
            "table": "b01001",
            "expression": ["b01001026", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Male & Female (percent)",
            "favstyle": ["jenks", "7", "sh5"],
            "bg": "yes"
        },

        "ageless10": {
            "title": "Percent Age Less Than 10",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001003", "+", "b01001004", "+", "b01001027", "+", "b01001028", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh1"],
            "bg": "yes"
        },

        "ageless18": {
            "title": "Percent Age Less Than 18",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001003", "+", "b01001004", "+", "b01001027", "+", "b01001028", "+", "b01001005", "+", "b01001006", "+", "b01001029", "+", "b01001030", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh2"],
            "bg": "yes"
        },

        "age18to24": {
            "title": "Percent Age 18 to 24",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001007", "+", "b01001008", "+", "b01001009", "+", "b01001010", "+", "b01001031", "+", "b01001032", "+", "b01001033", "+", "b01001034", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh3"],
            "bg": "yes"
        },

        "age25to34": {
            "title": "Percent Age 25 to 34",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001011", "+", "b01001012", "+", "b01001035", "+", "b01001036", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh4"],
            "bg": "yes"
        },

        "age35to44": {
            "title": "Percent Age 35 to 44",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001013", "+", "b01001014", "+", "b01001037", "+", "b01001038", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh5"],
            "bg": "yes"
        },

        "age45to64": {
            "title": "Percent Age 45 to 64",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001015", "+", "b01001016", "+", "b01001017", "+", "b01001018", "+", "b01001019", "+", "b01001039", "+", "b01001040", "+", "b01001041", "+", "b01001042", "+", "b01001043", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh6"],
            "bg": "yes"
        },

        "age65plus": {
            "title": "Percent Age 65 Plus",
            "section": "Age",
            "table": "b01001",
            "expression": ["(", "b01001020", "+", "b01001021", "+", "b01001022", "+", "b01001023", "+", "b01001024", "+", "b01001025", "+", "b01001044", "+", "b01001045", "+", "b01001046", "+", "b01001047", "+", "b01001048", "+", "b01001049", ")", "/", "b01001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Age Group (percent)",
            "favstyle": ["jenks", "7", "mh7"],
            "bg": "yes"
        },

        "medianage": {
            "title": "Median Age",
            "section": "Age",
            "table": "b01002",
            "expression": ["b01002001"],
            "type": "number",
            "minval": "1",
            "mininc": "0.1",
            "usezeroasnull": "yes",
            "favtable": "Median Age",
            "favstyle": ["jenks", "7", "mh8"],
            "bg": "yes"
        },

        "households": {
            "title": "Total Households",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001001"],
            "type": "number",
            "minval": "0",
            "mininc": "1",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh9"],
            "bg": "yes"
        },

        "familyhh": {
            "title": "Percent Family Households",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001002", "/", "b11001001"],
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "yes"
        },

        "nonfamhh": {
            "title": "Percent Non Family Households",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001007", "/", "b11001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh11"],
            "bg": "yes"
        },

        "housingun": {
            "title": "Total Housing Units",
            "section": "Housing",
            "table": "b25002",
            "expression": ["b25002001"],
            "type": "number",
            "minval": "0",
            "mininc": "1",
            "usezeroasnull": "no",
            "favtable": "Housing Units (total)",
            "favstyle": ["jenks", "7", "mh12"],
            "bg": "yes"
        },

        "occhu": {
            "title": "Percent Occupied Housing Units",
            "section": "Housing",
            "table": "b25002",
            "expression": ["b25002002", "/", "b25002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Occupancy (percent)",
            "favstyle": ["jenks", "7", "sh1"],
            "bg": "yes"
        },

        "vachu": {
            "title": "Percent Vacant Housing Units",
            "section": "Housing",
            "table": "b25002",
            "expression": ["b25002003", "/", "b25002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Occupancy (percent)",
            "favstyle": ["jenks", "7", "sh2"],
            "bg": "yes"
        },

        "owned": {
            "title": "Percent Owner Occupied Housing Units",
            "section": "Housing",
            "table": "b25003",
            "expression": ["b25003002", "/", "b25003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Tenure (percent)",
            "favstyle": ["jenks", "7", "sh4"],
            "bg": "yes"
        },

        "rented": {
            "title": "Percent Renter Occupied Housing Units",
            "section": "Housing",
            "table": "b25003",
            "expression": ["b25003003", "/", "b25003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Tenure (percent)",
            "favstyle": ["jenks", "7", "sh5"],
            "bg": "yes"
        },

        "nohsdipl": {
            "title": "Percent No High School Diploma",
            "section": "Education",
            "table": "b15003",
            "expression": ["(", "b15003002", "+", "b15003003", "+", "b15003004", "+", "b15003005", "+", "b15003006", "+", "b15003007", "+", "b15003008", "+", "b15003009", "+", "b15003010", "+", "b15003011", "+", "b15003012", "+", "b15003013", "+", "b15003014", "+", "b15003015", "+", "b15003016", ")", "/", "b15003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Educational Attainment (percent)",
            "favstyle": ["jenks", "7", "sh6"],
            "bg": "yes"
        },

        "hsgradsc": {
            "title": "Percent High School Degree or Some College",
            "section": "Education",
            "table": "b15003",
            "expression": ["(", "b15003017", "+", "b15003018", "+", "b15003019", "+", "b15003020", "+", "b15003021", ")", "/", "b15003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Educational Attainment (percent)",
            "favstyle": ["jenks", "7", "mh1"],
            "bg": "yes"
        },

        "bachlhghr": {
            "title": "Percent Bachelors Degree or Higher",
            "section": "Education",
            "table": "b15003",
            "expression": ["(", "b15003022", "+", "b15003023", "+", "b15003024", "+", "b15003025", ")", "/", "b15003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Educational Attainment (percent)",
            "favstyle": ["jenks", "7", "mh2"],
            "bg": "yes"
        },

        "medcrent": {
            "title": "Median Contract Rent",
            "section": "Rent",
            "table": "b25058",
            "expression": ["b25058001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Contract Rent",
            "favstyle": ["jenks", "7", "mh3"],
            "bg": "yes"
        },

        "medgrent": {
            "title": "Median Gross Rent",
            "section": "Rent",
            "table": "b25064",
            "expression": ["b25064001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "Median Gross Rent",
            "favstyle": ["jenks", "7", "mh4"],
            "bg": "yes"
        },

        "citzbirth": {
            "title": "Percent US Citizen by Birth",
            "section": "Citizenship",
            "table": "b05001",
            "expression": ["(", "b05001002", "+", "b05001003", "+", "b05001004", ")", "/", "b05001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Citizenship (percent)",
            "favstyle": ["jenks", "7", "mh5"],
            "bg": "no"
        },

        "citznat": {
            "title": "Percent US Citizen by Naturalization",
            "section": "Citizenship",
            "table": "b05001",
            "expression": ["b05001005", "/", "b05001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Citizenship (percent)",
            "favstyle": ["jenks", "7", "mh6"],
            "bg": "no"
        },

        "notcitz": {
            "title": "Percent Not a US Citizen",
            "section": "Citizenship",
            "table": "b05001",
            "expression": ["b05001006", "/", "b05001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Citizenship (percent)",
            "favstyle": ["jenks", "7", "mh7"],
            "bg": "no"
        },

        "borninsor": {
            "title": "Percent US Native, Born in State of Residence",
            "section": "Birthplace",
            "table": "b05002",
            "expression": ["b05002003", "/", "b05002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Birthplace (percent)",
            "favstyle": ["jenks", "7", "mh8"],
            "bg": "no"
        },

        "bornothst": {
            "title": "Percent US Native, Born in Another State",
            "section": "Birthplace",
            "table": "b05002",
            "expression": ["b05002004", "/", "b05002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Birthplace (percent)",
            "favstyle": ["jenks", "7", "mh9"],
            "bg": "no"
        },

        "nativeb": {
            "title": "Percent US Native",
            "section": "Birthplace",
            "table": "b05002",
            "expression": ["b05002002", "/", "b05002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Birthplace (percent)",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "no"
        },

        "foreignb": {
            "title": "Percent Foreign Born",
            "section": "Birthplace",
            "table": "b05002",
            "expression": ["b05002013", "/", "b05002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Birthplace (percent)",
            "favstyle": ["jenks", "7", "mh11"],
            "bg": "no"
        },

        "samehouse": {
            "title": "Percent Did Not Move",
            "section": "Migration",
            "table": "b07003",
            "expression": ["b07003004", "/", "b07003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Migration (percent)",
            "favstyle": ["jenks", "7", "mh12"],
            "bg": "no"
        },

        "samecnty": {
            "title": "Percent Moved Within County",
            "section": "Migration",
            "table": "b07003",
            "expression": ["b07003007", "/", "b07003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Migration (percent)",
            "favstyle": ["jenks", "7", "sh1"],
            "bg": "no"
        },

        "samestate": {
            "title": "Percent Moved from Different County Within State",
            "section": "Migration",
            "table": "b07003",
            "expression": ["b07003010", "/", "b07003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Migration (percent)",
            "favstyle": ["jenks", "7", "sh2"],
            "bg": "no"
        },

        "diffstate": {
            "title": "Percent Moved from Different State",
            "section": "Migration",
            "table": "b07003",
            "expression": ["b07003013", "/", "b07003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Migration (percent)",
            "favstyle": ["jenks", "7", "sh4"],
            "bg": "no"
        },

        "frmabroad": {
            "title": "Percent Moved From Abroad",
            "section": "Migration",
            "table": "b07003",
            "expression": ["b07003016", "/", "b07003001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Migration (percent)",
            "favstyle": ["jenks", "7", "sh5"],
            "bg": "no"
        },

        "carall": {
            "title": "Percent Drove a Car Truck or Van to Work",
            "section": "Transportation",
            "table": "b08006",
            "expression": ["b08006002", "/", "b08006001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Transportation to Work (percent)",
            "favstyle": ["jenks", "7", "sh6"],
            "bg": "no"
        },

        "usedpt": {
            "title": "Percent Used Public Transportation",
            "section": "Transportation",
            "table": "b08006",
            "expression": ["b08006008", "/", "b08006001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Transportation to Work (percent)",
            "favstyle": ["jenks", "7", "mh1"],
            "bg": "no"
        },

        "bike": {
            "title": "Percent Biked to Work",
            "section": "Transportation",
            "table": "b08006",
            "expression": ["b08006014", "/", "b08006001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Transportation to Work (percent)",
            "favstyle": ["jenks", "7", "mh2"],
            "bg": "no"
        },

        "walked": {
            "title": "Percent Walked to Work",
            "section": "Transportation",
            "table": "b08006",
            "expression": ["b08006015", "/", "b08006001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Transportation to Work (percent)",
            "favstyle": ["jenks", "7", "mh3"],
            "bg": "no"
        },

        "home": {
            "title": "Percent Worked at Home",
            "section": "Transportation",
            "table": "b08006",
            "expression": ["b08006017", "/", "b08006001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Transportation to Work (percent)",
            "favstyle": ["jenks", "7", "mh4"],
            "bg": "no"
        },

        "avghhsize": {
            "title": "Average Household Size",
            "section": "Housing",
            "table": "b25010",
            "expression": ["b25010001"],
            "type": "number",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "yes",
            "favtable": "Average Household Size",
            "favstyle": ["jenks", "7", "mh5"],
            "bg": "yes"
        },

        "insured": {
            "title": "Percent Insured",
            "section": "Insurance",
            "table": "b27001",
            "expression": ["(", "b27001004", "+", "b27001007", "+", "b27001010", "+", "b27001013", "+", "b27001016", "+", "b27001019", "+", "b27001022", "+", "b27001025", "+", "b27001028", "+", "b27001032", "+", "b27001035", "+", "b27001038", "+", "b27001041", "+", "b27001044", "+", "b27001047", "+", "b27001050", "+", "b27001053", "+", "b27001056", ")", "/", "b27001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Insurance (percent)",
            "favstyle": ["jenks", "7", "mh7"],
            "bg": "no"
        },

        "uninsured": {
            "title": "Percent No Insurance",
            "section": "Insurance",
            "table": "b27001",
            "expression": ["(", "b27001005", "+", "b27001008", "+", "b27001011", "+", "b27001014", "+", "b27001017", "+", "b27001020", "+", "b27001023", "+", "b27001026", "+", "b27001029", "+", "b27001033", "+", "b27001036", "+", "b27001039", "+", "b27001042", "+", "b27001045", "+", "b27001048", "+", "b27001051", "+", "b27001054", "+", "b27001057", ")", "/", "b27001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Insurance (percent)",
            "favstyle": ["jenks", "7", "mh8"],
            "bg": "no"
        },

        "enrolled": {
            "title": "Percent Enrolled in School",
            "section": "Education",
            "table": "b14001",
            "expression": ["b14001002", "/", "b14001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Enrolled in School (percent)",
            "favstyle": ["jenks", "7", "mh9"],
            "bg": "no"
        },

        "k8": {
            "title": "Percent of Enrolled in K-8",
            "section": "Education",
            "table": "b14001",
            "expression": ["(", "b14001004", "+", "b14001005", "+", "b14001006", ")", "/", "b14001002"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Enrolled in School (percent)",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "no"
        },

        "enrhs": {
            "title": "Percent of Enrolled in 9-12",
            "section": "Education",
            "table": "b14001",
            "expression": ["b14001007", "/", "b14001002"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Enrolled in School (percent)",
            "favstyle": ["jenks", "7", "mh11"],
            "bg": "no"
        },

        "enrcollege": {
            "title": "Percent of Enrolled in Colleges",
            "section": "Education",
            "table": "b14001",
            "expression": ["(", "b14001008", "+", "b14001009", ")", "/", "b14001002"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Enrolled in School (percent)",
            "favstyle": ["jenks", "7", "mh12"],
            "bg": "no"
        },

        "notenrolled": {
            "title": "Percent Not Enrolled in School",
            "section": "Education",
            "table": "b14001",
            "expression": ["b14001010", "/", "b14001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Enrolled in School (percent)",
            "favstyle": ["jenks", "7", "sh1"],
            "bg": "no"
        },

        "inpoverty": {
            "title": "Percent in Poverty",
            "section": "Poverty",
            "table": "c17002",
            "expression": ["(", "c17002002", "+", "c17002003", ")", "/", "c17002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Poverty (percent)",
            "favstyle": ["jenks", "7", "sh2"],
            "bg": "yes"
        },

        "inpov150": {
            "title": "Percent Below 150% Poverty",
            "section": "Poverty",
            "table": "c17002",
            "expression": ["(", "c17002002", "+", "c17002003", "+", "c17002004", "+", "c17002005", ")", "/", "c17002001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Poverty (percent)",
            "favstyle": ["jenks", "7", "sh4"],
            "bg": "yes"
        },

        "disabled": {
            "title": "Percent Disabled",
            "section": "Disability",
            "table": "b18101",
            "expression": ["(", "b18101004", "+", "b18101007", "+", "b18101010", "+", "b18101013", "+", "b18101016", "+", "b18101019", "+", "b18101023", "+", "b18101026", "+", "b18101029", "+", "b18101032", "+", "b18101035", "+", "b18101038", ")", "/", "b18101001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Disability (percent)",
            "favstyle": ["jenks", "7", "sh5"],
            "bg": "no"
        },

        "unemp": {
            "title": "Percent Unemployed",
            "section": "Employment",
            "table": "b23025",
            "expression": ["b23025005", "/", "b23025002"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Unemployment (percent)",
            "favstyle": ["jenks", "7", "sh6"],
            "bg": "yes"
        },

        "armedforces": {
            "title": "Percent of Labor Force in Armed Forces",
            "section": "Employment",
            "table": "b23025",
            "expression": ["b23025006", "/", "b23025002"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Unemployment (percent)",
            "favstyle": ["jenks", "7", "mh1"],
            "bg": "yes"
        },

        "realtaxes": {
            "title": "Median Real Estate Taxes Paid",
            "section": "Housing",
            "table": "b25103",
            "expression": ["b25103001"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "",
            "favstyle": ["jenks", "7", "mh2"],
            "bg": "no"
        },

        "moc_wmc": {
            "title": "Median Monthly Owner Costs (w Mortgage)",
            "section": "Housing",
            "table": "b25088",
            "expression": ["b25088002"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "",
            "favstyle": ["jenks", "7", "mh3"],
            "bg": "yes"
        },

        "moc_nmc": {
            "title": "Median Monthly Owner Costs (no Mortgage)",
            "section": "Housing",
            "table": "b25088",
            "expression": ["b25088003"],
            "type": "currency",
            "minval": "1",
            "mininc": "1",
            "usezeroasnull": "yes",
            "favtable": "",
            "favstyle": ["jenks", "7", "mh4"],
            "bg": "yes"
        },

        "hhalone": {
            "title": "Pct of Households w Householder Living Alone",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001008", "/", "b11001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "",
            "favstyle": ["jenks", "7", "mh5"],
            "bg": "yes"
        },

        "hhnalone": {
            "title": "Pct of Households w Householder Not Living Alone",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001009", "/", "b11001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh6"],
            "bg": "yes"
        },

        "mcfhh": {
            "title": "Percent Married Couple Family Households",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001003", "/", "b11001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh7"],
            "bg": "yes"
        },

        "mhhnwphh": {
            "title": "Percent Male Householder, No Wife Present Households",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001005", "/", "b11001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh8"],
            "bg": "yes"
        },

        "fhhnhphh": {
            "title": "Percent Female Householder, No Husband Present Households",
            "section": "Household",
            "table": "b11001",
            "expression": ["b11001006", "/", "b11001001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "Household Type (total)",
            "favstyle": ["jenks", "7", "mh9"],
            "bg": "yes"
        },

        "hhwchild": {
            "title": "Percent Households w Children Under 18 Present",
            "section": "Household",
            "table": "b11005",
            "expression": ["b11005002", "/", "b11005001"],
            "type": "percent",
            "minval": "0",
            "mininc": "0.01",
            "usezeroasnull": "no",
            "favtable": "",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "yes"
        },
        "cbhm": {
            "title": "Cost Burdened Households (with a Mortgage)",
            "section": "Housing",
            "table": "b25101",
            "expression": ["(", "b25101006", "+", "b25101010", "+", "b25101014", "+", "b25101020", "+", "b25101022", ")", "/", "b25101002"],
            "type": "percent",
            "minval": "0",
            "mininc": ".01",
            "usezeroasnull": "no",
            "favtable": "Cost Burdened Households (with a Mortgage)",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "yes"
        },
        "elvw": {
            "title": "Population 5 and Over That Speaks English Less Than Very Well",
            "section": "Language",
            "table": "b06007",
            "expression": ["(", "b06007008", "+", "b06007005", ")", "/", "b06007001"],
            "type": "percent",
            "minval": "0",
            "mininc": ".01",
            "usezeroasnull": "no",
            "favtable": "Place of Birth by Language Spoken at Home and Ability to Speak English",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "no"
        },
        "p5ss": {
            "title": "Population 5 and Over That Speaks Spanish",
            "section": "Language",
            "table": "b06007",
            "expression": ["b06007003", "/", "b06007001"],
            "type": "percent",
            "minval": "0",
            "mininc": ".01",
            "usezeroasnull": "no",
            "favtable": "Place of Birth by Language Spoken at Home and Ability to Speak English",
            "favstyle": ["jenks", "7", "mh10"],
            "bg": "no"
        }

    }
};
