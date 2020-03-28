package com.baldyoung.photoalbum.common.jo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:system.properties")
public class GlobalConfig {

    @Value("${imagePath}")
    public String imagePath;


}
