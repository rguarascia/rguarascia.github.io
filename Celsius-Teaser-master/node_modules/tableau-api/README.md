# Tableau API

This is a version of the
[JavaScript API for Tableau](http://www.tableau.com/new-features/javascript-api)
wrapped as an NPM module.

## Usage

To use this module:

    npm install --save tableau-api

Then, require it in your code:

    var tableau = require('tableau-api');

Or import it directly:

    import tableau from "tableau-api";

Once imported, you'll need to add it as follows:

```javascript
    initTableau() {
        const vizUrl =
            "https://public.tableau.com/views/VacationHome/VacationHome?:embed=y&:display_count=yes";

        const options = {
            hideTabs: true,
            width: "700px",
            height: "800px",
            onFirstInteractive: () => {
                const sheet = viz.getWorkbook().getActiveSheet().getWorksheets().get("Table");
                const options = {
                    ignoreAliases: false,
                    ignoreSelection: false,
                    includeAllColumns: false
                };
                sheet.getUnderlyingDataAsync(options).then((t) => {
                    const tableauData = t.getData();
                    let data = [];
                    const pointCount = tableauData.length;
                    for(let a = 0; a < pointCount; a++ ) {
                        data = data.concat({
                            x: tableauData[a][0].value,
                            y: Math.round(tableauData[a][3].value,2)
                        })
                    };
                })
            }
        };

        let viz = new window.tableau.Viz(this.container, vizUrl, options);
```

This will provide you with the most up-to-date functionality in the API.

Refer to [the API documentation](http://onlinehelp.tableau.com/current/api/js_api/en-us/help.htm)
for the details on how to use it.
