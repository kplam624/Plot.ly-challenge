// Fill the panel with metadata information
function buildMetadata(sample) {
    var panelBox = d3.select(".panel-primary");
    
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

        data2 = [trace2];

        layout2 = {
            title: "Bubble Chart"
        };

        Plotly.newPlot("bubble",data2,layout2);
    });
    
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
        
        // Pull the data to create plots
        var sample = data.samples;

        // Filter the plot to find id.
        var person = sample.filter(subject => subject.id === "940")[0];
        console.log(person);
        
        // First plot will be the bar plot.
        // Taking only the needed values for the plots
        var topTenSample = person.sample_values.slice(0,10);
        var topTenLabel = person.otu_labels.slice(0,10);
        var topTenID = person.otu_ids.slice(0,10);
        var otuId = topTenID.map(i => "OTU " + i);

        // Creating the trace
        trace = {
                x: topTenSample.reverse(),
                y: otuId.reverse(),
                text : topTenLabel.reverse(),
                type : "bar",
                orientation: "h"
            };
        
        // Creating the data for the plot
        data = [trace];
        
        // Adding the layout
        layout = {
        title: "Belly Button Data"
        };

        // Creating the plot where needed.
        Plotly.newPlot("bar",data,layout);
        
        // Create bubble chart in correct location
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

        data2 = [trace2];

        layout2 = {
            title: "Bubble Chart"
        };

        Plotly.newPlot("bubble",data2,layout2);
    });
};

function optionChanged(newSample){
    var panelBox = d3.select(".panel-primary");
    
    // Update metadata with newly selected sample
    panelBox.selectAll(".panel-body").remove();
    buildMetadata(newSample)
    
    // Update charts with newly selected sample
    buildCharts(newSample)

}

// Initialize dashboard on page load
init();

// This shows the json files.
// d3.json("././samples.json").then(function(data){
//     console.log(data.samples)
// });

// Time to make plots.
