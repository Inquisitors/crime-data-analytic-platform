package org.inquisitors.platform.model;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Buwaneka on 12/15/2016.
 */
public class FileBucket {
    MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
