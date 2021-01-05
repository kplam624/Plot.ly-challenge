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
    d3.json("././samples.json").then(function(data){
        var samples = data.samples;

        // Parse and filter the data to get the sample's OTU data
        var person = samples.filter(subject => subject.id === sample)[0];
        console.log(person);
        
        var topTenSample = person.sample_values.slice(0,10);
        var topTenLabel = person.otu_labels.slice(0,10);
        var topTenID = person.otu_ids.slice(0,10);
        var otuId = topTenID.map(i => "OTU " + i);
        // Create bar chart in correct location
        trace = {
                x: topTenSample.reverse(),
                y: otuId.reverse(),
                text : topTenLabel.reverse(),
                type : "bar",
                orientation: "h"
            };
        
        data = [trace];
        
        layout = {
        title: "Belly Button Data"
        };
    
        Plotly.newPlot("bar",data,layout);
        // Create bubble chart in correct location
    });

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
        var sample = data.samples;
        var person = sample.filter(subject => subject.id === "940")[0];
        console.log(person);
        
        var topTenSample = person.sample_values.slice(0,10);
        var topTenLabel = person.otu_labels.slice(0,10);
        var topTenID = person.otu_ids.slice(0,10);
        var otuId = topTenID.map(i => "OTU " + i);

        trace = {
                x: topTenSample.reverse(),
                y: otuId.reverse(),
                text : topTenLabel.reverse(),
                type : "bar",
                orientation: "h"
            };
        
        data = [trace];
        
        layout = {
        title: "Belly Button Data"
        };

        Plotly.newPlot("bar",data,layout);
        
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
