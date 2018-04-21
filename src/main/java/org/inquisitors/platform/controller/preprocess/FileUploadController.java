package org.inquisitors.platform.controller.preprocess;

import com.google.gson.Gson;
import org.inquisitors.platform.model.Preprocessor;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

/**
 * Created by minudika on 11/27/16.
 */
@Controller
public class FileUploadController {
    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="/preprocess/getselectedfile",method = RequestMethod.POST)
    public String getSelectedFile(@RequestParam("tableName") String tableName) throws IOException, JSONException, InterruptedException {
        Preprocessor.process(tableName);
        return gson.toJson("Preprocess Success");
    }
}
