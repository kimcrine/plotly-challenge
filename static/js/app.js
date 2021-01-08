// Create function to get data and plot
function getPlot(id) {
    
    // Read the json file to get data
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        // Filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        console.log(samples);

        // Get the top 10 sample values
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        // Get the top 10 otu ids
        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        // Get the otu id's to the desired form for plotting
        var idOtu = idValues.map(d => "OTU " + d)

        console.log(`OTU IDS: ${idOtu}`)

        // Get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${sampleValues}`)
        console.log(`Id Values: ${idValues}`)
                
        // Create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        // Create data variable
        var data = [trace];

        // Create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

         // Create the bar plot
         Plotly.newPlot("bar", data, layout);

         //console.log(`ID: ${samples.otu_ids}`)
         
         // Create the trace for the bubble chart
         var trace1 = {
             x: samples.otu_ids,
             y: samples.sample_values,
             mode: "markers",
             marker: {
                 size: samples.sample_values,
                 color: samples.otu_ids
             },
             text: samples.otu_labels
 
         };
         
        // Set the layout for the bubble plot
        var layoutb = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };
  
        // Create data variable 
        var data1 = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layoutb); 
  
        // Guage chart
  
        var datag = [
          {
            type: "indicator",
            mode: "gauge+number",
            //domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: { text: "Weekly Washing Frequency", font: { size: 24 }},
            gauge: { 
                axis: { range: [null, 10], tickwidth: 1},
                bar: { color: "lightgray" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
            steps: [
                { range: [0, 2], color: "red" },
                { range: [2, 4], color: "orange" },
                { range: [4, 6], color: "yellow" },
                { range: [6, 8], color: "yellowgreen" },
                { range: [8, 10], color: "green" }
                  ]}
              
          }
        ];
        var layoutg = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", datag, layoutg);
      });
  }  

// Create the function to get the necessary data
function getInfo(id) {
    // Read the json file to get data
    d3.json("samples.json").then((data)=> {
        
        // Get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // Filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // Select demographic panel to
        var demographicInfo = d3.select("#sample-metadata");
        
        // Empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();