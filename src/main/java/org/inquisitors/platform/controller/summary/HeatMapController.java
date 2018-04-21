package org.inquisitors.platform.controller.summary;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.inquisitors.platform.model.Preprocessor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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
public class HeatMapController {
    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="/summary/getheatmapdata",method = RequestMethod.POST)
    public String getHeatmapResults(@RequestParam("category") String category) throws IOException, JSONException {
        System.out.println("skfjnskjfnksjfnks"+category);

        /*Visualizer v=new Visualizer();
        v.readFile("./data/sample.csv","crimeData");
        v.doPreprocessing();*/

        Visualizer v = Preprocessor.getVisualizer();
        String categories[] = category.split(":");
        String names[]=new String[categories.length];
        int i=0;
        for(String s:categories){
            names[i++] = s;
        }
        if(categories.length > 0) {
            List list = v.heatMapData(names);
            return gson.toJson(list);
        }
        else{
            String s = "null";
            return gson.toJson(s);
        }
    }

    @ResponseBody
    @RequestMapping(value = "/summary/getspecialmapdata",method = RequestMethod.POST)
    public String getSpecialMapResults(@RequestParam("type") String type) throws IOException, JSONException {
        Visualizer v = new Visualizer();
        if(type.equals("one")){
            return gson.toJson(v.weekendsCrimeLoc());
        }
        else if(type.equals("two")){
            return gson.toJson(v.weekDaysCrimeLoc());
        }
        else if(type.equals("three")){
            return gson.toJson(v.newYearEveCrimes());
        }
        else
            return null;
    }

    private JSONArray getLocations(int year) throws JSONException {
        JSONObject jsonObject_longitudes = new JSONObject();
        JSONObject jsonObject_latitudes = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        CSVReader csvReader = new CSVReader();
        HeatMapDataset heatMapDataset;
        switch (year) {
            case 2000:
                heatMapDataset = csvReader.read("./data/out.csv");
                break;
            case 2005:
                heatMapDataset = csvReader.read("./data/out2.csv");
                break;
            default:
                heatMapDataset = csvReader.read("./data/out3.csv");
                break;
        }

        int x=10;
        for(int i=0;i<heatMapDataset.getLattitudes().size();i++){
            jsonObject_longitudes.put(Integer.toString(i),Double.toString(heatMapDataset.getLattitudes().get(i)));
        }

        for(int i=0;i<heatMapDataset.getLongitudes().size();i++){
            jsonObject_latitudes.put(Integer.toString(i),Double.toString(heatMapDataset.getLongitudes().get(i)));
        }

        jsonArray.put(1,jsonObject_longitudes);
        jsonArray.put(2,jsonObject_latitudes);

        return jsonArray;
    }

    @ResponseBody
    @RequestMapping(value = "/getCategories", method = RequestMethod.POST)
    public String getCategoryNames() throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        List<String> categories = v.getCategories();
        String names = "[";
        for(String cat : categories){
            names += "\""+cat+"\",";
        }
        names += "\"\"]";
        return gson.toJson(categories);
    }

    @ResponseBody
    @RequestMapping(value = "/getCoordinatesDateRange", method = RequestMethod.POST)
    public String getCoordinatesDateRange(@RequestParam("dateRange") String dateRange) throws IOException {
        String splitValue[] = dateRange.split(":");
        Visualizer v = Preprocessor.getVisualizer();
        List list = v.getHeatmap_forRange(Integer.parseInt(splitValue[0]),Integer.parseInt(splitValue[1]),Integer.parseInt(splitValue[2]),Integer.parseInt(splitValue[3]),Integer.parseInt(splitValue[4]),Integer.parseInt(splitValue[5]));
        return gson.toJson(list);
    }

    @ResponseBody
    @RequestMapping(value = "/getCoordinatesDate", method = RequestMethod.POST)
    public String getCoordinatesDate(@RequestParam("dateRange") String dateRange) throws IOException {
        String splitValue[] = dateRange.split(":");
        Visualizer v = Preprocessor.getVisualizer();
        List list = v.getHeatmap_forRange(Integer.parseInt(splitValue[0]),Integer.parseInt(splitValue[1]),Integer.parseInt(splitValue[2]));
        return gson.toJson(list);
    }
}
