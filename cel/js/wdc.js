(function () {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id: "Country", alias: "Country", dataType: tableau.dataTypeEnum.string },
            { id: "Year", alias: "Year", dataType: tableau.dataTypeEnum.int },
            { id: "GDP", alias: "GDP", dataType: tableau.dataTypeEnum.float }
        ];
        var tableInfo = {
            id: "taxi",
            alias: "TLC Trip Data",
            columns: cols
        };
        schemaCallback([tableInfo]);
    };
    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://celsiustester.azurewebsites.net/", function (resp) {
            var feat = JSON.parse(resp);
            tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Country": feat[i]["Country"],
                    "Year": feat[i]["Year"],
                    "GDP": feat[i]["GDP"]
                });
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "taxi";
            tableau.submit();
        });
    });
})();