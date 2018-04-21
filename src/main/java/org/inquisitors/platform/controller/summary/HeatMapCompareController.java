package org.inquisitors.platform.controller.summary;


import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.inquisitors.platform.model.Preprocessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

/**
 * Created by minudika on 2/2/17.
 */

@Controller
public class HeatMapCompareController {
    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value = "/getLocationsForWeekend", method = RequestMethod.POST)
    public String getLocationsForWeekend() throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        List locations = v.weekendsCrimeLoc();
        return gson.toJson(locations);
    }

    @ResponseBody
    @RequestMapping(value = "/getLocationsForWeekdays", method = RequestMethod.POST)
    public String getLocationsForWeekdays() throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        List locations = v.weekDaysCrimeLoc();
        return gson.toJson(locations);
    }

    @ResponseBody
    @RequestMapping(value = "/getLocationsTimeRange", method = RequestMethod.POST)
    public String getLocationsForTimeRange(@RequestParam("start") Integer startTime,@RequestParam("end") Integer endTime) throws IOException {
        Visualizer v = Preprocessor.getVisualizer();
        //List locations =  v.timeComparison(startTime,endTime);
        //return gson.toJson(locations);
        return "hello";
    }
}
