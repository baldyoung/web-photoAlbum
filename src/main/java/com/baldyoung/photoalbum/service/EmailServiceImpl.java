package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.utility.SendEmailModule;
import jdk.nashorn.internal.objects.annotations.Constructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.util.Arrays;

@Component
public class EmailServiceImpl {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private SendEmailModule sendEmailModule;

    @PostConstruct
    public void init() {
        logger.info("开始构建邮件服务...");
        try {
            sendEmailModule = SendEmailModule.getInstance("baldyoung@126.com", "china123");
        } catch (Exception e) {
            logger.warn("邮件服务构建失败"+e.getMessage());
        }
        logger.info("邮件服务已启动");
    }

    public boolean sendEmail(String receiverEmail, String content, String title) {
        MimeMessage msg = null;
        try {
            msg = sendEmailModule.createMessage(title, content);
            sendEmailModule.insertAddresseeToMsg(msg, new String[]{receiverEmail});
            sendEmailModule.sendMessage(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return true;
    }



}
