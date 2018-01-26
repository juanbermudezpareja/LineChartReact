# MultiLine Chart

The propose of this project is showing an example of how to use a multiline chart and the different options that can be configured.

In this project, there have been used the next libraries to render the multiline chart:
* D3.js v4
* React

Component is published in the following site: https://juanbermudezpareja.github.io/LineChartReact/

## Instructions to run the project
To run this command, in order to install all the library dependencies:

>npm i

The next step is to run the project using the next command:

>npm start

Open your favourite browser and type http://localhost:8080 in it. The multiline chart and a table is on it.

## Input data features
Three different ways can be used to be shown datas in the chart:

1. Using a demo harcoded data. In that case, we should not confire anything.
2. Using a tsv file. In that case, we should inform the 
parameter tsvPath in the chart component.
3. Using a csv file. In that case, we should inform the parameter csvPath in the chart component.

## Properties configuration

The following properties can be used to configure the multiline chart:

* tsvPath: Optional. Path where the input data are taken. If neigher this parameter is present nor the csvPath, harcoded data will be showed. 
* csvPath: Optional. Path where the input data are taken. If neigher this parameter is not present nor the tsvPath, harcoded data will be showed.
* dateFormat: Format of the date belonging to the X axis.
Example: "%d/%M/%Y"
* height: Height in pixels of the chart view. Take into account the chart width is adapted to the window.
* legendAxisY: Text to inform the meaning of the Y axis. 
