package org.inquisitors.platform.controller.summary;


import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.abithana.frontConnector.Vizualizer_prescription;
import org.inquisitors.platform.model.Preprocessor;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

/**
 * Created by minudika on 11/6/16.
 */

@Controller
public class HistogramController {
    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="/summary/gethistogramdata",method = RequestMethod.POST)
    public String getHistogramResults(@RequestParam("category") String category,@RequestParam("id") String id) throws IOException, JSONException {
        System.out.println("category : "+ category+" | id : "+id);

        /*Visualizer v=new Visualizer();
        v.readFile("./data/sample.csv","crimeData");*/

        Visualizer v = Preprocessor.getVisualizer();
        System.out.println("file read completed");


        if(id.equalsIgnoreCase("years")){
            List list = v.categoryWiseData(category);
            System.out.println(list.toString());
            return gson.toJson(list);
        }
        else{
            List list = v.yearWiseData(Integer.parseInt(category));
            System.out.println(list.toString());
            return gson.toJson(list);
        }
    }

    @ResponseBody
    @RequestMapping(value="/summary/getHistogramResultsForRange",method = RequestMethod.POST)
    public String getHistogramResultsDays(@RequestParam("days") String days) throws IOException, JSONException {
        Visualizer v = Preprocessor.getVisualizer();
        String dayList[] = days.split(":");
        List list = v.getDayWiseFrequncy_forRange(Integer.parseInt(dayList[0]),Integer.parseInt(dayList[1]),Integer.parseInt(dayList[3]),Integer.parseInt(dayList[4]));
        return gson.toJson(list);
    }

    @ResponseBody
    @RequestMapping(value="/summary/getHistogramResultsForDate",method = RequestMethod.POST)
    public String getHistogramResultsDate(@RequestParam("date") String date) throws IOException, JSONException {
        Visualizer v = Preprocessor.getVisualizer();
        String dayList[] = date.split(":");
        List list = v.getDayWiseFrequncy(Integer.parseInt(dayList[0]),Integer.parseInt(dayList[1]));
        return  gson.toJson(list);
    }

//    @ResponseBody
//    @RequestMapping(value="/prescription/getHistogramResultsForBeats",method = RequestMethod.POST)
//    public String getHistogramResultsDate() throws IOException, JSONException {
//        Vizualizer_prescription v = new Vizualizer_prescription();
//        List list = v.evaluateResponseTime();
//        return  gson.toJson(list);
//    }
//
//    @ResponseBody
//    @RequestMapping(value="/prescription/getHistogramEvalCompactness",method = RequestMethod.POST)
//    public String getHistogramEvalCompacness() throws IOException, JSONException {
//        Vizualizer_prescription v = new Vizualizer_prescription();
//        List list = v.evaluateResponseTime();
//        return  gson.toJson(list);
//    }



}
