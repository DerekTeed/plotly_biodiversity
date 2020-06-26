function getPlots(id) {

d3.json("samples.json").then(function (data) {
    var samples_labels = data.samples[0].otu_labels.slice(0, 10);
    console.log(samples_labels)
    var samples_ids = data.samples[0].otu_ids.slice(0, 10);
    console.log(samples_ids)
    var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
    console.log(sampleValues)
    console.log('Look here', data.samples[0].otu_ids)
    //    var meta_data = data.metadata[0].otu_labels.slice(0,10);
    //    console.log(meta_data)
    console.log(data)
    var OTU_id = samples_ids.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`)

    var trace = {
        x: sampleValues,
        y: OTU_id,
        text: sampleValues,
        marker: {
            color: 'blue'
        },
        type: "bar",
        orientation: "h",
    };
    // create data variable
    var data3 = [trace];

    // create layout variable to set plots layout
    var layout = {
        title: "Top 10 OTU",
        yaxis: {
            tickmode: "linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }}

     // create the bar plot
     Plotly.newPlot("bar", data3, layout);
        // The bubble chart
        console.log('Look here', data.samples[0].otu_ids)
     var trace1 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text: data.samples[0].otu_labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        // creatçing data variable 
        var data1 = [trace1];

        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_2);




    });
}
// create the function to get the necessary data
function getDemoInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then((data) => {
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");

        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}
// create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data) => {
        console.log('test data 113',data)

        // get the id data to the dropdwown menu
        data.names.forEach(function (name) {
           // console.log('test name',name)
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();





//First go into html terminal and python -m http.server
//The bring up that website locally on chrome and
//you will see the console.log shit on there.
//Then proceed