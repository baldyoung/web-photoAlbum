package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.RecordEmailDao;
import com.baldyoung.photoalbum.common.jo.config.GlobalConfig;
import com.baldyoung.photoalbum.common.utility.SendEmailModule;
import jdk.nashorn.internal.objects.annotations.Constructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Component
public class EmailServiceImpl {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private SendEmailModule sendEmailModule = null;

    @Autowired
    private GlobalConfig config;

    @Autowired
    private RecordEmailDao recordEmailDao;

    @PostConstruct
    public void init() {
        logger.info("开始构建邮件服务...");
        logger.info("{senderAccount:"+config.senderEmailAccount+", pwd:"+config.senderEmailPWD+"}");
        try {
            sendEmailModule = SendEmailModule.getInstance(config.senderEmailAccount, config.senderEmailPWD);
        } catch (Exception e) {
            e.printStackTrace();
            logger.warn("邮件服务构建失败"+e.getMessage());
        }
        logger.info("邮件服务已启动");
    }

    public boolean sendEmail(String receiverEmail, String content, String title) {
        /*if (null == sendEmailModule) {
            init();
        }*/
        if (null == sendEmailModule) {
            return false;
        }
        MimeMessage msg = null;
        String status = "0";
        Map<String, String> param = new HashMap();
        param.put("receiverEmail", receiverEmail);
        param.put("senderEmail", config.senderEmailAccount);
        param.put("emailContent", content);
        try {
            msg = sendEmailModule.createMessage(title, content);
            sendEmailModule.insertAddresseeToMsg(msg, new String[]{receiverEmail});
            sendEmailModule.sendMessage(msg);
        } catch (MessagingException e) {
            status = "2";
            logger.error(e.getMessage());
        } catch (UnsupportedEncodingException e) {
            status = "1";
            logger.error(e.getMessage());
        } finally {
            param.put("emailStatus", status);
            recordEmailDao.insert(param);
        }
        return true;
    }



}
