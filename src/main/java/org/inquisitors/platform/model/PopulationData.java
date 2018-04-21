package org.inquisitors.platform.model;

import org.abithana.frontConnector.Visualizer_UploadPopulationData;

/**
 * Created by User on 1/25/2017.
 */
public class PopulationData {
    private static Visualizer_UploadPopulationData uploadPopulationData;
    private static PopulationData populationData;

    private PopulationData(){
        populationData = new PopulationData();
    }

    public static PopulationData getInstance(){ return populationData;}
}
