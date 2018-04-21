package org.inquisitors.platform.controller.prediction;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.abithana.frontConnector.Visualizer_Prediction;
import org.abithana.frontConnector.Visualizer_UploadCrime;
import org.apache.commons.math3.analysis.function.Constant;
import org.apache.hadoop.yarn.webapp.hamlet.HamletSpec;
import org.inquisitors.platform.model.Preprocessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Buwaneka on 12/18/2016.
 */
@Controller
public class PredictionController {

    Gson gson = new Gson();
    private static final String TABLE_NAME = "PreprocessData";
    private static final String TEST_FILE_PATH = "./data/test_data/";

  /*****************to send data to train the model********************/
    @ResponseBody
    @RequestMapping(value = "/trainmodel", method = RequestMethod.POST)
    public String trainModel(@RequestParam("option") String option,@RequestParam("layer") String layer, @RequestParam("type") String type,@RequestParam("trees") int trees,@RequestParam("folds") int folds, @RequestParam("columns") ArrayList<String> columns,@RequestParam("label") String label, @RequestParam("blockSize") int blockSize, @RequestParam("maxIterations") int iterations, @RequestParam("partitions") double partitions, @RequestParam("seeds") int seeds){
        System.out.println("train model called!");
        Visualizer_Prediction v = new Visualizer_Prediction();
        v.doPreprocessing(TABLE_NAME);
        String[] columnArray = new String[columns.size()];
        for(int i=0;i<columns.size();i++){
            columnArray[i] = columns.get(i);
        }
        //to return when RForest and pipeline
        if(type.equals("one") && option.equals("one")){
            return gson.toJson(v.train_MLPpipeline(columnArray,label,layer,blockSize,seeds));
        }
        else if(type.equals("one") && option.equals("two")){
            return gson.toJson(v.train_MLPCrossValidation(columnArray,label,layer,blockSize,seeds,folds));
        }
        else if(type.equals("two")  && option.equals("one")){
           return gson.toJson(v.train_RFpipeline(columnArray,label,trees,seeds));
        }
        else if(type.equals("two") && option.equals("two")){
           return gson.toJson(v.train_RFCrossValidation(columnArray,label,trees,seeds,folds));
        }
        else if(type.equals("three") && option.equals("one")){
            return gson.toJson(v.train_NBpipeline(columnArray,label));
            //return gson.toJson("hello");
        }
        else if(type.equals("three") && option.equals("two")){
            return gson.toJson(v.train_NBCrossValidation(columnArray,label,folds));
        }

        return "not successful!";
    }

    /*
    * To set ColumnNames
    */
    @ResponseBody
    @RequestMapping(value = "/setfeature", method = RequestMethod.POST)
    public String setFeatureColumns(@RequestParam("state") boolean state) throws  IOException{
        Visualizer_Prediction v = new Visualizer_Prediction();
        return gson.toJson(v.integrateRaceData(state));
    }



    /*
     * To get the accuracy
     */
    @ResponseBody
    @RequestMapping(value = "/getaccuracy", method = RequestMethod.POST)
    public String getAccuracy() throws  IOException{
        Visualizer_Prediction v = new Visualizer_Prediction();
        return "hello";
    }

    @ResponseBody
    @RequestMapping(value="/getColumnNames", method = RequestMethod.POST)
    public String getColumnNames() throws IOException {
        Visualizer_Prediction vm = new Visualizer_Prediction();
        vm.integrateRaceData(false);
         return gson.toJson(vm.getColumnNames("prediction"));
    }

    @ResponseBody
    @RequestMapping(value="/getDownloadPath", method = RequestMethod.POST)
    public String getDownloadPath() throws IOException {
        Visualizer_Prediction vm = new Visualizer_Prediction();
        return gson.toJson(vm.downloadFile());
    }

    @ResponseBody
    @RequestMapping(value="/predictForTestFile", method = RequestMethod.POST)
    public String predictTestFile(@RequestParam("testFilePath") String testFile, @RequestParam("columns") ArrayList<String> columns) throws IOException {
        String testFilePath = TEST_FILE_PATH+testFile;
        Visualizer_Prediction vm = new Visualizer_Prediction();
        String[] columnArray = new String[columns.size()];
        for(int i=0;i<columns.size();i++){
            columnArray[i] = columns.get(i);
        }
        return gson.toJson(vm.predict(testFilePath,columnArray));
    }

    /*@ResponseBody
    @RequestMapping(value = "/getCategories", method = RequestMethod.POST)
    public String getCategoryNames() throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        String tableName = v.getPreprocessTableName();
        List<String> categories = v.getCategoories(tableName);
//        String names = "[";
//        for(String cat : categories){
//            names += "\""+cat+"\",";
//        }
//        names += "\"\"]";
        return gson.toJson(categories);
    }
*/

}
