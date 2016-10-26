angular.module('cttvDirectives')

.directive ('multipleTargetsTissuesSummary', ['$log', '$http', '$q', 'cttvConfig', 'cttvUtils', function ($log, $http, $q, cttvConfig, cttvUtils) {
    'use strict';

    var tissuesOrdered = [
        "Adipose",
        "Adrenal Gland",
        "Bladder",
        "Brain",
        "Breast",
        "Cells",
        "Cervix",
        "Colon",
        "Esophagus",
        "Fallopian Tube",
        "Heart",
        "Kidney",
        "Liver",
        "Lung",
        "Minor Salivary Gland",
        "Muscle",
        "Nerve",
        "Ovary",
        "Pancreas",
        "Pituitary",
        "Prostate",
        "Skin",
        "Small Intestine",
        "Spleen",
        "Stomach",
        "Testis",
        "Thyroid",
        "Uterus",
        "Vagina",
        "Whole Blood"
    ];

    var tissuesTableCols = [
        {name:"", title:""}, // first one empty
        {name:"", title:"Target"}
    ];

    for (var z=0; z<tissuesOrdered.length; z++) {
        tissuesTableCols.push({
            name: tissuesOrdered[z],
            title: tissuesOrdered[z]
        });
    }
    tissuesTableCols.push({name:"",title:""}); // last one empty

    var colorScale = cttvUtils.colorScales.BLUE_0_1;
    var getColorStyleString = function (value) {
        var str = "";
        if (value <= 0) {
            str = "<span class='no-data' title='No data'></span>"; // quick hack: where there's no data, don't put anything so the sorting works better
        } else {
            var col = colorScale(value);
            var val = (value === 0) ? "0" : cttvUtils.floatPrettyPrint(value);
            str = "<span style='color: " + col + "; background: " + col + ";' title='Score: " + val + "'>" + val + "</span>";
        }

        return str;
    };

    //setup the table
    var setupTissuesTable = function (table, data, filename) {
        $(table).DataTable({
            "dom": '<"clearfix" <"clear small" i><"pull-left small" f><"pull-right"<"#cttvTableDownloadIcon">>rt<"pull-left small" l><"pull-right small" p>>',
            "data": data,
            "columns": (function(){
                var a=[];
                for(var i=0; i<tissuesTableCols.length; i++){
                    a.push({ "title": "<div><span title='"+tissuesTableCols[i].title+"'>"+tissuesTableCols[i].title+"</span></div>", "name":tissuesTableCols[i].name });
                }
                return a;
            })(),
            "order": [],
            "orderMulti": true,
            "autoWidth": false,
            "columnDefs" : [
                {
                    "targets" : [0,32],
                    "orderable": false
                },
            ],
            "ordering": true,
            "lengthMenu": [[20, 100, 500], [20, 100, 500]],
            "pageLength": 20,
            "language": {
                // "lengthMenu": "Display _MENU_ records per page",
                // "zeroRecords": "Nothing found - sorry",
                "info": "Showing _START_ to _END_ of _TOTAL_ shared targets",
                // "infoEmpty": "No records available",
                // "infoFiltered": "(filtered from _MAX_ total records)"
            }

        }, filename);
    };


    function parseTissuesData (tissuesData) {
        // var txt = tissuesPerTarget(tissues);
        var newData = [];
        for (var target in tissuesData) {
            // var row = [];
            var row = [""]; // First one empty
            // Target
            row.push(target);
            for (var i=0; i<tissuesOrdered.length; i++) {
                var tissue = tissuesOrdered[i];
                // Each Tissue
                // row.push(tissuesData[target][tissue].maxMedian);
                row.push(getColorStyleString(tissuesData[target][tissue].maxMedian));
            }
            row.push(""); // last one empty
            newData.push(row);
        }
        return newData;
    }


    return {
        restrict: 'E',
        templateUrl: 'partials/multiple-targets-tissues-summary.html',
        scope: {
            targets: '='
        },
        link: function (scope, el, attrs) {
            scope.$watch ("targets", function () {
                if (!scope.targets) {
                    return;
                }

                var gtexPromises = [];
                var baseGtexUrlPrefix = "/proxy/gtexportal.org/api/v6p/expression/";
                var baseGtexUrlSufix = "?boxplot=true";
                var mapUrl = {};
                for (var i=0; i<scope.targets.length; i++) {
                    var target = scope.targets[i];
                    var url = baseGtexUrlPrefix + target + baseGtexUrlSufix;
                    mapUrl[url] = target;
                    gtexPromises.push($http.get(url));
                }
                $q.all(gtexPromises)
                    .then (function (resps) {
                        var tissuesData = {};
                        var maxVal = 0;
                        for (var i=0; i<resps.length; i++) {
                            var tissues = {};
                            var target = mapUrl[resps[i].config.url];
                            for (var fullTissue in resps[i].data.generpkm) {
                                var d = resps[i].data.generpkm[fullTissue];
                                var median = d.median;
                                var tissue = fullTissue.split(" - ")[0];
                                if (!tissues[tissue]) {
                                    tissues[tissue] = {
                                        target: target,
                                        tissue: tissue,
                                        maxMedian: 0
                                    };
                                }
                                if (median > tissues[tissue].maxMedian) {
                                    tissues[tissue].maxMedian = median;
                                }
                                if (median > maxVal) {
                                    maxVal = median;
                                }
                            }
                            // var tissuesData = parseTissuesData(_.values(tissues));
                            tissuesData[target] = tissues;
                        }
                        colorScale.domain([0, maxVal]);
                        var tissueDataRows = parseTissuesData(tissuesData);
                        var table = document.getElementById("tissuesSummaryTargetList");
                        table.innerHTML = "";
                        setupTissuesTable(table, tissueDataRows, "gtex-data-gene-list.txt");
                    });

            });
        }
    };
}]);