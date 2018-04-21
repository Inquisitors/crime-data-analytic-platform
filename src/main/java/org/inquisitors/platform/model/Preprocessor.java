package org.inquisitors.platform.model;

import org.abithana.frontConnector.Visualizer;

/**
 * Created by minudika on 11/28/16.
 */
public class Preprocessor {
    private static Visualizer visualizer;
    private static Preprocessor preprocessor = new Preprocessor();

    private Preprocessor(){
        visualizer = new Visualizer();
    }

    public static Visualizer getVisualizer(){
        return visualizer;
    }

    public static void process(String tableName){
        visualizer.doPreprocessing(tableName);
    }

}
