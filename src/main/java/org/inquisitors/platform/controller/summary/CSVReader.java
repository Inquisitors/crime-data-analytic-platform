package org.inquisitors.platform.controller.summary;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 * Created by minudika on 7/27/16.
 */
public class CSVReader {

    public HeatMapDataset read(String filePath) {
        String csvFile = filePath;
        String line = "";
        String cvsSplitBy = ",";
        HeatMapDataset heatMapDataset = new HeatMapDataset();
        int count=0;
        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {

            while ((line = br.readLine()) != null) {
                // use comma as separator
                if(count>100) break;
                count++;
                if(count == 1){
                    continue;
                }
                String[] data = line.split(cvsSplitBy);
                //1552710,180269
                if(data[0].length() == 0) data[0] = "1552710";
                if(data[1].length() == 0) data[1] = "180269";

                heatMapDataset.addLattitude(Double.parseDouble(data[1]));
                heatMapDataset.addLongitude(Double.parseDouble(data[0]));
                //System.out.println("Country [code= " + country[4] + " , name=" + country[5] + "]");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return heatMapDataset;

    }

}

