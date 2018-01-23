# MultiLine Chart

The propose of this project is showing an example of how to use a multiline chart and the different options that can be configure.

In this project, there have been used the next libraries to render the multiline chart:
* D3.js v4
* React

## Instructions to run the project
To run this project, firstly, it is necessary to install dependencies:

>npm install

Secondly, next command will run the app:

>npm start

Finally, open your browser in http://localhost:8080 and you will be able to see and play with the multiline chart.

## Input data features
The input data can be configured in three different way:

1. Using a demo harcoded data. In that case, we should not confire anything.
2. Using a tsv file. In that case, we should inform the 
parameter:
    - tsvPath. Relative path where is located a tsv file with the datas.
3. Using a csv file. In that case, we should inform the parameter:
    - csvPath. Relative path where is located a tsv file with the datas.

## Properties configuration

The following properties can be used to configure the multiline chart:

* tsvPath: Optional. Path where the input data are taken. If neigher this parameter is present nor the csvPath, harcoded data will be showed. 
* csvPath: Optional. Path where the input data are taken. If neigher this parameter is not present nor the tsvPath, harcoded data will be showed.
* dateFormat: Format of the date belonging to the X axis.
Example: "%d/%M/%Y"
* height: Height in pixels of the chart view. Take into account the chart width is adapted to the window.
* legendAxisY: Text to inform the meaning of the Y axis. 
