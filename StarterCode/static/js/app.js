// Create function to get data and plot
function getPlot(id) {
    
    // Get the data from the json file
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