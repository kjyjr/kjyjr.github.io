/*
Note: After initially completing the codes below for making the first sample bar and bubble charts (lines 6-68) as well as populating the Demographic Info table (lines 87-118), consultation was made with a BCS Learning Assistant about further code development to update those charts and table when a different subject ID was selected from the "Test Subject ID No:" dropdown list. That consultation yielded recommendations to wrap the code for making the bar and bubble charts into a function and likewise doing the same for the code for populating the Demographic Info table for those functions to be called later for making dynamic changes to the dashboard - hence, "function charts()" and its call on lines 4 and 70, respectively, and "function demo()" and its call on lines 85 and 120, respectively.
*/
function charts()
  {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data){
      console.log(data);
              
      let top10_sample_values = data.samples[0].sample_values.slice(0, 10);
      let top10_otu_ids = data.samples[0].otu_ids;
      let top10_otu_labels = data.samples[0].otu_labels;
      
      let trace_otu = {
        x: top10_sample_values,
        y: top10_otu_ids.map(id => `OTU ${id}`),
        type: "bar",
        orientation: "h",
        text: top10_otu_labels
        };

      let data_otu = [trace_otu];

      let layout_otu = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 },
        yaxis:{autorange: 'reversed'}
        };

      Plotly.newPlot("bar", data_otu, layout_otu);
/*
To reach the code above for the horizontal bar chart, corrections were needed to my original code, and those corrections were identified by BCS Learning Assistants. First, all of the code following the first line for loading the data was placed inside the callback function to assure that the data was not just logged to the console but available for processing. The code involving "data.samples" was revised to include the .filter function. Likewise, to assure that the OTU IDs were obtained, "y:" in the trace_otu variable was revised by using the .map function. Also, different margins were advised for the layout than originally used. Lastly, to make the bars in the chart appear with the longest bar on top, tapering down to the shortest, an addition was made to the code for the layout. To that, "yaxis:{autorange: 'reversed'}" was inserted after researching the following source: https://stackoverflow.com/questions/46201532/plotly-js-reversing-the-horizontal-bar-chart-in-plotly.
*/
      let sample_values = data.samples[0, 152].sample_values;
      let otu_ids = data.samples[0, 152].otu_ids;
      let otu_labels = data.samples[0, 152].otu_labels;
        
      var bubble_samples = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          color: otu_ids,
          size: sample_values
          }
        };
        
      var data = [bubble_samples];
        
      var layout = {
        title: 'OTU Samples',
        showlegend: false,
        height: 500,
        width: 1250,
        xaxis: {
          title: {
            text: 'OTU ID',
            font: {
              family: 'Calibri, monospace',
              size: 14,
              color: 'black'
              }
            }
          }
        }
      
      Plotly.newPlot('bubble', data, layout);
    });
 }
charts();
/*
The basic construct for the "var" lines in the above code for the bubble chart was made available through the following link provided by my class instructor: https://plotly.com/javascript/bubble-charts/. In addition, code for the x-axis title was derived from the following source, under "Styling Names": https://plotly.com/javascript/figure-labels/.
*/
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
  data.names.forEach((subject) => {
    let subject_list = d3.select("#selDataset");
    let option = subject_list.append("option");
    option.text(subject);
      }
    );
  });
/*
The above code for appending IDs to the Test Subject ID No: dropdown was achieved in coordination with a BCS Learning Assistant, revising and correcting my initial code.
*/
function demo()
  {
    let demo_info = d3.select("#sample-metadata");
    d3.select("#sample-metadata").html("");
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let id = data.metadata[0].id;
        let option_id = demo_info.append("option_id");
        option_id.text(`id: ${id}`);
        demo_info.append("br");
      let ethnicity = data.metadata[0].ethnicity;
        let option_eth = demo_info.append("option_eth");
        option_eth.text(`ethnicity: ${ethnicity}`);
        demo_info.append("br");
      let gender = data.metadata[0].gender;
        let option_gen = demo_info.append("option_gen");
        option_gen.text(`gender: ${gender}`);
        demo_info.append("br");
      let age = data.metadata[0].age;
        let option_age = demo_info.append("option_age");
        option_age.text(`age: ${age}`);
        demo_info.append("br");
      let location = data.metadata[0].location;
        let option_loc = demo_info.append("option_loc");
        option_loc.text(`location: ${location}`);
        demo_info.append("br");
      let bbtype = data.metadata[0].bbtype;
        let option_bb = demo_info.append("option_bb");
        option_bb.text(`bbtype: ${bbtype}`);
        demo_info.append("br");
      let wfreq = data.metadata[0].wfreq;
        let option_wfreq = demo_info.append("option_wfreq");
        option_wfreq.text(`wfreq: ${wfreq}`);
          }
        );
  }
demo();
/*
For the above section of code to populate the Demographic Info panel, I worked almost all of the code on my own. Two  exceptions were the insertion of "d3.select("#sample-metadata").html("");" at line 88 and "demo_info.append("br");" at lines 93, 97, 101, 105, 109, and 113. All of those insertions were suggested by BCS Learning Assistants whom I consulted about coding for updating the dashboard itself when different subject IDs are selected. The code at line 88 was inserted to assure that only one set of metadata for a given subject ID is displayed, and the code inserted on the other lines serves to provide breaks between the different elements displayed in the panel.
*/
function optionChanged()
    {
      charts();
      demo();
    }

let subject_list = d3.select("#selDataset");
subject_list.on("change", function() {optionChanged(this.value);});
/*
The code on lines 124-131 was constructed based on recommendations provided by various BCS Learning Assistants. However, despite their recommnedations on the basic construct of the code, the precise syntax was not realized to effect a complete update of the dashboard visuals when a different test subject id is selected.
*/