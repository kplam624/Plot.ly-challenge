// Fill the panel with metadata information
function buildMetadata(sample) {
    var panelBox = d3.select(".panel-primary");
    
    // Read the json data
    d3.json("././samples.json").then(function(data){

        // Parse and filter the data to get the sample's metadata
        var meta = data.metadata;

        // Filter through the data to find the correct subject id.
        var filteredMeta = meta.filter(subject => subject.id === parseInt(sample))[0];

        // Using the key and values to create the metadata
        Object.entries(filteredMeta).forEach(function([key,value]){

                // Specify the location of the metadata and update it
                var panel = panelBox.append("div").attr("id","sample-metadata").attr("class","panel-body");
                panel.text(key + ":" + value);
        });
    });
};
// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("././samples.json").then(function(data){
        
        // Search for the samples json
        var samples = data.samples;

        // Parse and filter the data to get the sample's OTU data
        var person = samples.filter(subject => subject.id === sample)[0];
        console.log(person);
        
        // Selecting the top ten values.
        var topTenSample = person.sample_values.slice(0,10);
        var topTenLabel = person.otu_labels.slice(0,10);
        var topTenID = person.otu_ids.slice(0,10);

        // Fixing the ids
        var otuId = topTenID.map(i => "OTU " + i);
        
        // Create bar chart in correct location
        // Creating the trace
        trace = {
                x: topTenSample.reverse(),
                y: otuId.reverse(),
                text : topTenLabel.reverse(),
                type : "bar",
                orientation: "h"
            };
        
        // Setting the data.
        data = [trace];
        
        // Layout of the plot.
        layout = {
        title : "Belly Button Data",
        xaxis : {title: "Sample Values"},
        yaxis : {title: "IDs"}
        };
    
        // Creating the plot.
        Plotly.newPlot("bar",data,layout);
        
        // Create bubble chart in correct location
        // Creating a trace
        trace2 = {
            x: person.otu_ids,
            y: person.sample_values,
            mode: "markers",
            text: person.otu_labels,
            marker : {
                size: person.sample_values,
                color: person.otu_ids,
            }
        }

        // Create the data
        data2 = [trace2];

        // Layout of the plot
        layout2 = {
            title: "Bubble Chart",
            xaxis: {title: "Sample Values"},
            yaxis: {title: "IDs"}
        };

        // Creating the plot
        Plotly.newPlot("bubble",data2,layout2);
    });
    
};

// Creating the dropdown menu
function buildDropdown(){
    
    // Read json data
    d3.json("././samples.json").then(function(data){

        // Parse and filter data to get sample names
        var name = data.names;
        var meta = data.metadata;

        // Add dropdown option for each sample
        var dropdown = d3.select("#selDataset");
        
        // Creating the dropdown menu with the value
        Object.entries(name).forEach(function([key,value]){

            // Adding the menu option
            dropdown.append("option").text(value);
        });
    });
};

// Define function that will run on page load
function init() {
    // Creates the the dropdown menu
    buildDropdown();

    // Hard coding the first item as this is the item that will load first.
    
    // Builds the metadata
    buildMetadata("940");

    // Builds the charts
    buildCharts("940");

    // Cleans up the metadata chart.
    var panelBox = d3.select(".panel-primary");
    panelBox.select(".panel-body").remove();
};

function optionChanged(newSample){
    // Selecting the panel.
    var panelBox = d3.select(".panel-primary");
    
    // Update metadata with newly selected sample
    panelBox.selectAll(".panel-body").remove();
    buildMetadata(newSample)
    
    // Update charts with newly selected sample
    buildCharts(newSample)
}

// Initialize dashboard on page load
init();
