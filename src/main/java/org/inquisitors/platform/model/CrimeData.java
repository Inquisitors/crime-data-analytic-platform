package org.inquisitors.platform.model;

import org.abithana.frontConnector.Visualizer_UploadCrime;

/**
 * Created by User on 1/25/2017.
 */
public class CrimeData {
    private static Visualizer_UploadCrime uploadCrime;
    private static  CrimeData crimeData = new CrimeData();

    private CrimeData(){
        uploadCrime = new Visualizer_UploadCrime();
    }

    public static Visualizer_UploadCrime getCrimeData(){return uploadCrime;}


}
