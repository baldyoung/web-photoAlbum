package com.baldyoung.photoalbum.common.jo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

/**
 * 系统配置类
 */
@Component
@PropertySource("classpath:system.properties")
public class GlobalConfig {

    @Value("${imagePath}")
    public String imagePath;

    @Value("${senderEmailAccount}")
    public String senderEmailAccount;

    @Value("${senderEmailPWD}")
    public String senderEmailPWD;


}
