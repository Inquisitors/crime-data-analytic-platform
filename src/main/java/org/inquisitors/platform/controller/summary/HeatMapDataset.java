package org.inquisitors.platform.controller.summary;

import java.util.ArrayList;

/**
 * Created by minudika on 7/1/16.
 */
public class HeatMapDataset {
    ArrayList<Double> lattitudes;
    ArrayList<Double> longitudes;

    public ArrayList<Double> getLattitudes() {
        return lattitudes;
    }

    public ArrayList<Double> getLongitudes() {
        return longitudes;
    }

    public HeatMapDataset(){
        lattitudes = new ArrayList<Double>();
        longitudes = new ArrayList<Double>();
    }

    public void addLongitude(Double longitude){
        longitudes.add(longitude);
    }

    public void addLattitude(Double lattitude){
        lattitudes.add(lattitude);
    }
}
