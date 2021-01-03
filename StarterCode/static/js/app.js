/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data
    d3.json("././samples.json").then(function(data){

        // Parse and filter the data to get the sample's metadata
        var meta = data.metadata;
        var filteredMeta = meta.filter(subject => subject.id === sample);
        // Specify the location of the metadata and update it


    });
}

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

    // Read json data
    d3.json("././samples.json").then(function(data){
        // Parse and filter data to get sample names
        var name = data.names;
        
        // Add dropdown option for each sample
        var dropdown = d3.select("#selDataset");
        Object.entries(name).forEach(function([key,value]){
            dropdown.append("option").text(value);
        });
    // Use first sample to build metadata and initial plots
        var meta = data.metadata;
        var filteredMeta = meta.filter(subject => subject.id === "940");
        
    });
};

function optionChanged(newSample){

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

// This shows the json files.
d3.json("././samples.json").then(function(data){
    // console.log(data.samples)
    console.log(data.metadata)
});

// Populate the dropdown menu with the names.
var dropdown = d3.select("#selDataset");

// Reads the json file
d3.json("././samples.json").then(function(data){
    // Calls the names on the json
    var name = data.names;

    // Pulls the names and uses them to populate the menu.
    Object.entries(name).forEach(function([key,value]){
        dropdown.append("option").text(value);
    });
});

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

d3.json("././samples.json").then(function(data){
    var sample = data.samples;
    var person = sample.filter(subject => subject.id === "940");
    console.log(person)
});
