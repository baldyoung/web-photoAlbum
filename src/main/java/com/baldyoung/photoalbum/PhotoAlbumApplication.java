package com.baldyoung.photoalbum;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@MapperScan("com.baldyoung.photoalbum.common.dao")
@SpringBootApplication
@ServletComponentScan
public class PhotoAlbumApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhotoAlbumApplication.class, args);
    }

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/","file:static/");
    }

}
