/*
Note: After completing the initial set of code below for the bar and bubble charts (lines 49-106) as well as populating the Demographic Info table (lines 26-35), consultation was made with a BCS Learning Assistant about further code development to update those charts and table when a different subject ID was selected from the "Test Subject ID No:" dropdown list. That consultation yielded recommendations to wrap the code for making the bar and bubble charts into a function and likewise doing the same for the code for populating the Demographic Info table for those functions to be called later for making dynamic changes to the dashboard.
*/

function start()
  {
    var select = d3.select("#selDataset");

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let subjectIDs = data.names;
      subjectIDs.forEach(subject => {select.append("option").text(subject).property("value", subject); 
      });

      let subject1 = subjectIDs[0];
      demoinfo(subject1);
      charts(subject1);
    });
  }
/*
The above code for appending IDs to the Test Subject ID No: dropdown was achieved in coordination with a BCS Learning Assistant, revising and correcting my initial code. Likewise, code on lines 15-17 was gleaned from instructor demonstration.
*/

function demoinfo(subject)
  {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let meta = data.metadata;
      let result = meta.filter(subjectResult => subjectResult.id == subject);
      let resultMeta = result[0];
      
      d3.select("#sample-metadata").html("");
      Object.entries(resultMeta).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
      }
    )};
/*
The above section of code to populate the Demographic Info panel was achieved after extensive re-work of my original code, drawing on my instructor's demonstration as well as insight provided by a senior learning assistant via use of the d3select html() on line 31.
*/

function charts(subject)
  {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      
      let sampleData = data.samples;
      let result = sampleData.filter(subjectResult => subjectResult.id == subject);
      let resultData = result[0];

      let top10_sample_values = resultData.sample_values.slice(0, 10);
      let top10_otu_ids = resultData.otu_ids;
      let top10_otu_labels = resultData.otu_labels;

      let bar_otu = {
        x: top10_sample_values,
        y: top10_otu_ids.map(id => `OTU ${id}`),
        type: "bar",
        orientation: "h",
        text: top10_otu_labels
        };

      let data_bar = [bar_otu];

      let layout_bar = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 },
        yaxis:{autorange: 'reversed'}
        };

      Plotly.newPlot("bar", data_bar, layout_bar);
/*
To reach the code above for the horizontal bar chart, corrections were needed to my original code, and those corrections were identified by BCS Learning Assistants. First, all of the code following the first line for loading the data was placed inside the callback function to assure that the data was not just logged to the console but available for processing. The code involving "data.samples" was revised to include the .filter function. Likewise, to assure that the OTU IDs were obtained, "y:" in the trace_otu variable was revised by using the .map function. Also, different margins were advised for the layout than originally used. Lastly, to make the bars in the chart appear with the longest bar on top, tapering down to the shortest, an addition was made to the code for the layout. To that, "yaxis:{autorange: 'reversed'}" was inserted after researching the following source: https://stackoverflow.com/questions/46201532/plotly-js-reversing-the-horizontal-bar-chart-in-plotly.
*/     
      var bubble_samples = {
        x: top10_otu_ids,
        y: top10_sample_values,
        text: top10_otu_labels,
        mode: 'markers',
        marker: {
          color: top10_otu_ids,
          size: top10_sample_values,
          colorscale: "Earth"
          }
        };
        
      var data_bubbles = [bubble_samples];
        
      var layout_bubbles = {
        title: 'Top 10 Belly Button Bacteria',
        hovermode: "closest",
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
      
      Plotly.newPlot('bubble', data_bubbles, layout_bubbles);
    });
  }
/*
The basic construct for the "var" lines in the above code for the bubble chart was made available through the following link provided by my class instructor: https://plotly.com/javascript/bubble-charts/. In addition, code for the x-axis title was derived from the following source, under "Styling Names": https://plotly.com/javascript/figure-labels/.
*/

function optionChanged(ID)
  {
    demoinfo(ID);
    charts(ID)
  }

start();