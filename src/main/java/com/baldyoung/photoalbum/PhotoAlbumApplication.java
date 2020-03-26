package com.baldyoung.photoalbum;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@MapperScan("com.baldyoung.pms.common.dao")
@SpringBootApplication
@ServletComponentScan
public class PhotoAlbumApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhotoAlbumApplication.class, args);
    }

}
