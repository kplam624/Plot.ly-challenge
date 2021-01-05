// Fill the panel with metadata information
function buildMetadata(sample) {

    // Read the json data
    d3.json("././samples.json").then(function(data){

        // Parse and filter the data to get the sample's metadata
        var meta = data.metadata;
        var filteredMeta = meta.filter(subject => subject.id === parseInt(sample));
        Object.entries(filteredMeta).forEach(function([key,value]){
            Object.entries(value).forEach(function([key2,value2]){
                // Specify the location of the metadata and update it
                var panel = panelBox.append("div").attr("id","sample-metadata").attr("class","panel-body");
                panel.text(key2 + ":" + value2);
            });
        });
    });
};
// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
};

// Define function that will run on page load
function init() {

    // Selecting the tags
    var panelBox = d3.select(".panel-primary");

    // Read json data
    d3.json("././samples.json").then(function(data){
    
        // Parse and filter data to get sample names
        var name = data.names;
        var meta = data.metadata;

        // Add dropdown option for each sample
        var dropdown = d3.select("#selDataset");
        Object.entries(name).forEach(function([key,value]){
            dropdown.append("option").text(value);
        });

    // Use first sample to build metadata and initial plots
        var filteredMeta = meta.filter(subject => subject.id === 940);
        
        Object.entries(filteredMeta).forEach(function([key,value]){
            Object.entries(value).forEach(function([key2,value2]){
                var panel = panelBox.append("div").attr("id","sample-metadata").attr("class","panel-body");
                panel.text(key2 + ":" + value2);
            });
            panelBox.select(".panel-body").remove();
        });     
    });
};

function optionChanged(newSample){

    var panelBox = d3.select(".panel-primary");
    
    // Update metadata with newly selected sample
    panelBox.selectAll(".panel-body").remove();
    buildMetadata(newSample)
    
    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

// This shows the json files.
// d3.json("././samples.json").then(function(data){
//     console.log(data.samples)
// });

// Time to make plots.

d3.json("././samples.json").then(function(data){
    var sample = data.samples;
    var person = sample.filter(subject => subject.id === "940")[0];
    console.log(person)


    Object.entries(person).forEach(function([key,value]){
        var datagr = Object.entries(value);
        console.log(datagr);
        
        var sampleSort = datagr[2][1].sort(function(a,b){
            console.log(b) 
            return b - a});
        console.log(sampleSort);
        var topTen = sampleSort.slice(0,10);
        console.log(topTen);
        reverseTen = topTen.reverse()

        // trace = {
        //     x: reverseTen,
        //     y: reverseTen.map(datagr => datagr.datagr[1][1]),
        //     text : reverseTen.map(datagr => datagr.datagr[3][1]),
        //     orientation: "h"
        // };

        // data = [trace];
        // layout = {
        //     title: "Dank"
        // }
        // Plotly.newPlot("bar",data,layout);
        });

});