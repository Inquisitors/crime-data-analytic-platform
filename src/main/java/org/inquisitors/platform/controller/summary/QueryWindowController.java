package org.inquisitors.platform.controller.summary;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
import org.inquisitors.platform.model.Preprocessor;
import org.inquisitors.platform.model.QueryExecutor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;


/**
 * Created by minudika on 10/2/16.
 */
@Controller
public class QueryWindowController {
    QueryExecutor queryExecutor = new QueryExecutor();
    Gson gson = new Gson();

   /* @ResponseBody
    @RequestMapping(value="/summary/executequery",method = RequestMethod.POST)
    public String execute() {
        System.out.println("boom");

        return gson.toJson("str");
    }*/

    @ResponseBody
    @RequestMapping(value="/summary/executequery",method = RequestMethod.POST)
    public String getQueryResults(@RequestParam("query") String query) throws IOException {
        System.out.println(query);
        /*Visualizer v=new Visualizer();
        v.readFile("./data/sample.csv","crimeData");
        System.out.println("file read completed");
        v.doPreprocessing();*/

        Visualizer v = Preprocessor.getVisualizer();
        return gson.toJson( v.executeQueries(query));
    }


}

class Query{
    String query;
    String firstName;
    String lastName;
}

