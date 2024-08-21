// Use the D3 Library to read in samples.json data
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch data and console log it
d3.json(url).then(function(data) {
    console.log(data);
})

// Create bar chart
    function bar_chart(sample){
    d3.json(url).then(function(data){
    let sample_list = data.samples.filter(sample_element => sample_element.id == sample)
    let sample_data = sample_list[0]

// Create arrays for samples, OTU id, OTU label
    let sample_values = sample_data.sample_values;
    let otu_ids = sample_data.otu_ids;
    let otu_labels = sample_data.otu_labels;

// Retrieve top 10 OTU's
    let top_ten_otu = sample_values.slice(0,10);
        console.log(top_ten_otu)
    let top_ten_ids = otu_ids.slice(0,10);
        console.log(top_ten_ids)
    let top_ten_labels = otu_labels.slice(0,10);
        console.log(top_ten_labels)

// Data trace array
    let barTrace = {
    x: top_ten_otu.reverse(),
    y: top_ten_ids.map(x => "OTU" + x).reverse(),
    text: top_ten_labels.reverse(),
    type: 'bar',
    orientation: 'h',
    marker: {
        color: 'rgb(52, 152,219)',
        opacity: 0.5,
        line: {
           color: 'rgb(40,116,166)',
           width: 1.5
        }
      }
    };
// Create Layout
    let barLayout = {
        title: '<b>Top 10 OTU</b>',
    };
    let data1 = [barTrace];
// Draw chart
    Plotly.newPlot('bar', data1, barLayout);
    })}

// Create bubble chart
    function bubble_chart(sample){
      d3.json(url).then(function(data){
      let sample_list = data.samples.filter(sample_element => sample_element.id == sample)
      let sample_data = sample_list[0]

// Create arrays for samples, OTU id, OTU label
    let sample_values = sample_data.sample_values;
    let otu_ids = sample_data.otu_ids;
    let otu_labels = sample_data.otu_labels;

// Data Trace
    let bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            colorscale: 'Earth',
            size: sample_values
        }
    };

// Create layout
    let bubbleLayout = {
        title: '<b>Bubble Chart</b>',
        automargin: true,
        autosize: true,
        showLegend: false,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
            }
    };
    let data2 = [bubbleTrace];
// Draw bubble chart
   Plotly.newPlot('bubble', data2, bubbleLayout);
    })
    }

//////

function demo_info(sample){
  d3.json(url).then(function(data) {
  let mdata=data.metadata.filter(function(sample_element){return sample_element.id==sample});
  //let mdata=data.metadata.filter(sample_element => sample_element.id==sample)
  let meta_info=mdata[0];
  console.log(data)
  d3.select("#sample-metadata").html("");
  Object.entries(meta_info).forEach(function([key,value]){
  d3.select("#sample-metadata")
  .append("p").text(`${key}:${value}`);

        });})}

function init(){
d3.json(url).then(function(data) {
let names = data.names;
console.log(names);
for (let i=0;i<names.length;i++){
d3.select("#selDataset")
  .append("option")
  .text(names[i])}
let sample1=names[0];
demo_info(sample1);
bar_chart(sample1);
bubble_chart(sample1);

})}


function optionChanged(item){
  demo_info(item)
  bar_chart(item)
  bubble_chart(item)
}

init();
