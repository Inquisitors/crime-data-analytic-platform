package org.inquisitors.platform.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;

import com.google.gson.Gson;
import org.abithana.frontConnector.Visualizer;
//import org.abithana.frontConnector.Visualizer_UploadCrime;
import org.abithana.frontConnector.Visualizer_UploadCrime;
import org.abithana.frontConnector.Visualizer_UploadPopulationData;
import org.apache.avro.generic.GenericData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.inquisitors.platform.model.FileBucket;
import org.inquisitors.platform.util.FileValidator;

/**
 * Created by Buwaneka on 12/14/2016.
 */

@Controller
public class FileUploaderController {
    private static String UPLOAD_LOCATION           = "./data/"; //"D:/FYP platform/FYP git/CDAP_Alpha/data"; //"D:/temp/";
    private static String CRIME_UPLOAD_LOCATION     = "./data/crime_data/";
    private static String CENSUS_UPLOAD_LOCATION    = "./data/census_data/";
    private static String TRACT_UPLOAD_LOCATION     = "./data/tract_data/";
    private static String TEST_UPLOAD_LOCATION      = "./data/test_data/";
    Gson gson = new Gson();
    @Autowired
    FileValidator fileValidator;

    @InitBinder("fileBucket")
    protected void initBinderFileBucket(WebDataBinder binder) {
        binder.setValidator(fileValidator);
    }

//    @RequestMapping(value={"/","/welcome"}, method = RequestMethod.GET)
//    public String getHomePage(ModelMap model) {
//        return "welcome";
//    }

    @RequestMapping(value="/singleUpload", method = RequestMethod.GET)
    public String getSingleUploadPage(ModelMap model) {
        FileBucket fileModel = new FileBucket();
        model.addAttribute("fileBucket", fileModel);
        return "singleFileUploader";
    }

    /******************for census data********************/
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/controller/upload", method = RequestMethod.POST)
    public String uploadCensusData(@RequestParam("file") MultipartFile file) throws IOException {
        //, @RequestParam("type") String type
        String type = "1";
        byte[] bytes;
        System.out.println("working 1!");
        if (!file.isEmpty()) {
            bytes = file.getBytes();
            //store file in storage
            FileCopyUtils.copy(bytes, new File(CENSUS_UPLOAD_LOCATION + file.getOriginalFilename()));

        }

        System.out.println(String.format("receive %s", file.getOriginalFilename()));
        return (UPLOAD_LOCATION + file.getName());
    }

    /********************for crime data****************************/
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/controller/upload1", method = RequestMethod.POST)
    public String uploadCrimeData(@RequestParam("file") MultipartFile file) throws IOException {
        //, @RequestParam("type") String type
        byte[] bytes;
        System.out.println("working 2!");
        if (!file.isEmpty()) {
            bytes = file.getBytes();
            //store file in storage
                FileCopyUtils.copy(bytes, new File(CRIME_UPLOAD_LOCATION + file.getOriginalFilename()));

        }

        System.out.println(String.format("receive %s", file.getOriginalFilename()));
        return (CRIME_UPLOAD_LOCATION + file.getName());
    }

    /*****************for tract data****************************************/
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/controller/upload2", method = RequestMethod.POST)
    public String uploadTractData(@RequestParam("file") MultipartFile file) throws IOException {
        byte[] bytes;
        System.out.println("working!");
        if (!file.isEmpty()) {
            bytes = file.getBytes();
            //store file in storage
                FileCopyUtils.copy(bytes, new File(TRACT_UPLOAD_LOCATION + file.getOriginalFilename()));
        }

        System.out.println(String.format("receive %s", file.getOriginalFilename()));
        return (TRACT_UPLOAD_LOCATION + file.getName());
    }

    /*****************for test data****************************************/
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/controller/upload3", method = RequestMethod.POST)
    public String uploadTestData(@RequestParam("file") MultipartFile file) throws IOException {
        byte[] bytes;
        System.out.println("working!");
        if (!file.isEmpty()) {
            bytes = file.getBytes();
            //store file in storage
            FileCopyUtils.copy(bytes, new File(TEST_UPLOAD_LOCATION + file.getOriginalFilename()));
        }

        System.out.println(String.format("receive %s", file.getOriginalFilename()));
        return (TEST_UPLOAD_LOCATION + file.getName());
    }


    @RequestMapping(value="/singleUpload", method = RequestMethod.POST)
    public String singleFileUpload(@Valid FileBucket fileBucket, BindingResult result, ModelMap model) throws IOException {
        if (result.hasErrors()) {
            System.out.println("validation errors");
            return "singleFileUploader";
        } else {
            System.out.println("Fetching file");
            MultipartFile multipartFile = fileBucket.getFile();

            //Now do something with file...
            FileCopyUtils.copy(fileBucket.getFile().getBytes(), new File(UPLOAD_LOCATION + fileBucket.getFile().getOriginalFilename()));

            String fileName = multipartFile.getOriginalFilename();
            model.addAttribute("fileName", fileName);
            return "success";
        }
    }

    @ResponseBody
    @RequestMapping(value = "/getfilelist", method = RequestMethod.POST )
    public List<String> getFiles(@RequestParam("path") String path) throws IOException{
        File directory = new File(path);
        File[] files = directory.listFiles();
        List<String> list = new ArrayList<>();

        for(File f: files){
            list.add(f.getName());
        }
        return list;
    }

    @ResponseBody
    @RequestMapping(value = "/getCensusSet", method = RequestMethod.POST )
    public List<String> getCensusFiles(@RequestParam("path") String path) throws IOException{
        File directory = new File(path);
        File[] files = directory.listFiles();
        List<String> list = new ArrayList<>();

        for(File f: files){
            list.add(f.getName());
        }
        return list;
    }

    @ResponseBody
    @RequestMapping(value = "/getCrimeSet", method = RequestMethod.POST )
    public List<String> getCrimeFiles(@RequestParam("path") String path) throws IOException{
        File directory = new File(path);
        File[] files = directory.listFiles();
        List<String> list = new ArrayList<>();

        for(File f: files){
            list.add(f.getName());
        }
        return list;
    }

    @ResponseBody
    @RequestMapping(value = "/getTractSet", method = RequestMethod.POST )
    public List<String> getTractFiles(@RequestParam("path") String path) throws IOException{
        File directory = new File(path);
        File[] files = directory.listFiles();
        List<String> list = new ArrayList<>();

        for(File f: files){
            list.add(f.getName());
        }
        return list;
    }

    public List<String> getCrimeFilesAvailable(String path) throws IOException{
        File directory = new File(path);
        File[] files = directory.listFiles();
        List<String> list = new ArrayList<>();

        for(File f: files){
            list.add(f.getName());
        }
        return list;
    }

    @ResponseBody
    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST )
    public List<String> deleteFiles(@RequestParam("file") String file, @RequestParam("type") int type) throws IOException{
        List<String> list = new ArrayList<String>();
        String filePath = "";
        System.out.println("type "+type);
        try{
               System.out.println(CENSUS_UPLOAD_LOCATION+file);
               File file1 = new File(CENSUS_UPLOAD_LOCATION+file);
                filePath  = CENSUS_UPLOAD_LOCATION+file;
               File[] files;
               if(type == 0) {
                   file1 = new File(CENSUS_UPLOAD_LOCATION + file);
                   filePath = CENSUS_UPLOAD_LOCATION + file;
               }
               else if(type == 1) {
                   file1 = new File(CRIME_UPLOAD_LOCATION + file);
                   filePath = CRIME_UPLOAD_LOCATION + file;
               }
               else if(type == 2) {
                   file1 = new File(TRACT_UPLOAD_LOCATION + file);
                   filePath = TRACT_UPLOAD_LOCATION + file;
               }
               while(!file1.delete());

               list = getCrimeFilesAvailable(filePath);

//               for(File f: files){
//                   list.add(f.getName());
//
//               }
            return list;

           }
           catch (Exception e){
               System.out.println("error occured");

           }
           list = getCrimeFiles(filePath);
           return list;
    }

    @ResponseBody
    @RequestMapping(value = "/getCensusFileColumns", method = RequestMethod.POST )
    public String getFileColumns(@RequestParam("file") String file) throws IOException{
        String path = CENSUS_UPLOAD_LOCATION+file;
        Visualizer_UploadPopulationData v = new Visualizer_UploadPopulationData();
        return gson.toJson(v.getColums(path));
    }

    @ResponseBody
    @RequestMapping(value = "/getCrimeFileColumns", method = RequestMethod.POST )
    public String getCrimeFileColumns(@RequestParam("file") String file) throws IOException{
        String path = CRIME_UPLOAD_LOCATION+file;
        Visualizer_UploadCrime v = new Visualizer_UploadCrime();
        if(file.equals("No File")){
            return "No File";
        }
        return gson.toJson(v.getColums(path));
        //return gson.toJson("hello2");
    }

    @ResponseBody
    @RequestMapping(value = "/getTractFileColumns", method = RequestMethod.POST )
    public String getTractFileColumns(@RequestParam("file") String file) throws IOException{
        String path = TRACT_UPLOAD_LOCATION+file;
        return gson.toJson("hello3");
    }

    @ResponseBody
    @RequestMapping(value = "/setCensusTable", method = RequestMethod.POST)
    public String setCensusTableColumns(@RequestParam("tableName") String tableName, @RequestParam("population") String population, @RequestParam("lat") String latitude, @RequestParam("lon") String longitude){
        Visualizer_UploadPopulationData populationUpload = new Visualizer_UploadPopulationData();
        System.out.println(tableName+" "+latitude+" "+longitude);
        return gson.toJson(populationUpload.saveTable(tableName,population,latitude,longitude));

    }

    @ResponseBody
    @RequestMapping(value = "/setCrimeTable", method = RequestMethod.POST)
    public String setCrimeTableColumns(@RequestParam("tableName") String tableName, @RequestParam("dates") String dates, @RequestParam("category") String category, @RequestParam("dayOfWeek") String dayOfWeek, @RequestParam("pdDistrict") String pdDistrict, @RequestParam("resolution") String resolution, @RequestParam("lat") String lat, @RequestParam("lon") String lon){
        Visualizer_UploadCrime crimeUpload = new Visualizer_UploadCrime();
        System.out.println(tableName+" "+dates+" "+category);
        return gson.toJson(crimeUpload.saveTable(tableName,dates,category,dayOfWeek,pdDistrict,resolution,lat,lon));

    }

    @ResponseBody
    @RequestMapping(value = "/getCrimefileLoaded", method = RequestMethod.POST )
    public String getCrimeFileLoaded() throws IOException{
        Visualizer_UploadCrime vm = new Visualizer_UploadCrime();
        return gson.toJson(vm.getFileName());
    }

    @ResponseBody
    @RequestMapping(value = "/getCrimeTableName", method = RequestMethod.POST )
    public String getCrimeTableName() throws IOException{
        Visualizer_UploadCrime vm = new Visualizer_UploadCrime();
        return gson.toJson(vm.getTableName());
    }

    @ResponseBody
    @RequestMapping(value = "/getPreTableRows", method = RequestMethod.POST )
    public String getNoRows() throws IOException{
        Visualizer vm = new Visualizer();
        return gson.toJson(vm.getNoofRows());
    }

    @ResponseBody
    @RequestMapping(value = "/getPreTableName", method = RequestMethod.POST )
    public String getPreName() throws IOException{
        Visualizer vm = new Visualizer();
        return gson.toJson(vm.getPreproceesedTableName());
    }





}