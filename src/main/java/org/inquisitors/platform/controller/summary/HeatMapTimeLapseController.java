package org.inquisitors.platform.controller.summary;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.inquisitors.platform.model.Preprocessor;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by minudika on 11/6/16.
 */
@Controller
public class HeatMapTimeLapseController {
    Gson gson = new Gson();

    @ResponseBody
    @RequestMapping(value = "/summary/getTimeLapseData", method = RequestMethod.POST)
    public String getHeatmapResults(@RequestParam("startYear") int startYear, @RequestParam("endYear") int endYear) throws IOException, JSONException {
        System.out.println(startYear+" "+endYear);

        Visualizer v = Preprocessor.getVisualizer();
        List list = v.timeLineAnimation(startYear,endYear);

        return gson.toJson(list);
    }

    @ResponseBody
    @RequestMapping(value = "/summary/getTimeLapsePlayData", method = RequestMethod.POST)
    public String getHeatmapPlayResults() throws IOException, JSONException {
        Visualizer v = Preprocessor.getVisualizer();
        HashMap coordinateMap = new HashMap();
        List <Integer>years = v.getYears();
        coordinateMap.put("years",years);
        Integer startYear = years.get(0);
        for(int i=0;i<years.size();i++){
            coordinateMap.put(years.get(i),v.timeLineAnimation(startYear,years.get(i)));
        }
        return gson.toJson(coordinateMap);
    }

    @ResponseBody
    @RequestMapping(value = "/summary/getYears", method = RequestMethod.POST)
    public String getYears() throws IOException, JSONException {
        Visualizer v = Preprocessor.getVisualizer();
        List list = v.getYears();
        List years = new ArrayList();
        years.add(list.get(0));
        years.add(list.get(list.size()-1));

        return gson.toJson(years);
    }
}
