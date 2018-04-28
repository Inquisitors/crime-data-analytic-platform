
# Crime Data Analytic Framework

This project was initiated as a final year research project of Department of computer science and engineering, 
university of Moratuwa, Sri lanka

## Getting Started

Before getting started, please make sure you have the required tools/software installed and configured in your computer.

### Prerequisites

1. Install [Apache Maven 3.x.x](https://maven.apache.org/install.html)


### Installing

1. First, clone the [Crime Data Analytic Framework](https://github.com/Inquisitors/CDAF.git) and build it using 
`mvn clean install` command.
2. Then clone and build the project [Crime Data Analytic Platform](https://github.com/Inquisitors/crime-data-analytic-platform.git).
3. Within Crime Data Analytic Platform project, run the following command to start the web application.
`mvn jetty:run`


### Working with the application

1. After starting the web application, you can access to it through `localhost:8080`
2. Load the datasets for crime data and tract data using the UI.
3. Provide necessary information and pre-process the crime dataset.
4. When the pre-processing is completed, you are ready to proceed with visualization etc..

