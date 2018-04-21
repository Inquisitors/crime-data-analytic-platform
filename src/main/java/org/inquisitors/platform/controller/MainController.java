package org.inquisitors.platform.controller;

import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

    @RequestMapping(value="/")
    public String getDefaultTemplate() {
        System.out.println("checked1");
        return "views/file-upload/file-upload";
    }

    @RequestMapping(value="/views/summary/heatmap/heatmap")
    public String getComputersTemplate() {
        System.out.println("checked1");
        return "views/summary/heatmap/heatmap";
    }

    @RequestMapping(value="/views/summary/histogram/view")
    public String getPhonesTemplate() {

        System.out.println("checked1");
        return "views/summary/histogram/view";
    }

    @RequestMapping(value="/views/file-upload/file-upload")
    public String getPrintersTemplate() {
        System.out.println("checked1");
        return "views/file-upload/file-upload";
    }

    @RequestMapping(value="/views/summary/querywindow/querywindow")
    public String getComputerDetailsTemplate() {
        System.out.println("checked1");
        return "views/summary/querywindow/querywindow";
    }



    @RequestMapping(value="/views/preprocess/file-upload/file_upload")
    public String getFileUploadTemplate() {
        System.out.println("checked1");
        return "views/preprocess/file-upload/file_upload";
    }

    @RequestMapping(value="/views/prediction/train_model")
    public String getModelTrainTemplate() {
        //System.out.println("train-model");
        return "views/prediction/train_model";
    }

    @RequestMapping(value="/views/prescription/police-boundaries")
    public String getPrescriptionTemplate() {
        //System.out.println("train-model");
        return "views/prescription/police-boundaries";
    }

    @RequestMapping(value="/views/upload-file/upload-file")
    public String getUploadFileTemplate() {
        System.out.println("upload!");
        return "views/upload-file/upload-file";
    }

    @RequestMapping(value="/views/summary/heatmap-timelaps/heatmap-timelaps")
    public String getHeatMapTimelapsTemplate() {
        System.out.println("upload!");
        return "views/summary/heatmap-timelaps/heatmap-timelaps";
    }

    @RequestMapping(value="/views/summary/heatmap-compare/heatmap-compare")
    public String getHeatMapCompareTemplate() {
        System.out.println("upload!");
        return "views/summary/heatmap-compare/heatmap-compare";
    }

    @RequestMapping(value="/views/prescription/beats-evaluation")
    public String getbeatsEvalTemplate() {
        System.out.println("upload!");
        return "/views/prescription/beats-evaluation";
    }
    @RequestMapping(value="/views/prescription/boundaries-evaluation")
    public String getboundaryEvalTemplate() {
        System.out.println("upload!");
        return "/views/prescription/boundaries-evaluation";
    }

    @RequestMapping(value="/views/prescription/boundary-seeds")
    public String getboundarySeeds() {
        //System.out.println("upload!");
        return "/views/prescription/boundary-seeds";
    }

    @RequestMapping(value="/views/prescription/boundaries")
    public String getBoundaryTemplate() {
        return "/views/prescription/boundaries";
    }
    @RequestMapping(value="/views/prescription/beats")
    public String getBeatsTemplate() {
        return "/views/prescription/beats";
    }



    //-----------------------------------

    Gson gson = new Gson();
    @ResponseBody
    @RequestMapping(value="summary/isdatasetavailable")
    public String isDatasetAvailable() {
        System.out.println("checking for dataset");
        return gson.toJson("available");
    }


}

