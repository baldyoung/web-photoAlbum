package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Component
public class UserServiceImpl {

    @Autowired
    private UserDao userDao;

    public Map loginCheck(String accountOrEmail, String password) {
        Map<String, String> param = new HashMap();
        param.put("userAccount", accountOrEmail);
        Map userInfo = userDao.selectWithCondition(param);
        if (null != userInfo && null != userInfo.get("userPassword")) {
            String correctPassword = String.valueOf(userInfo.get("userPassword"));
            if (password.equals(correctPassword)) {
                return userInfo;
            }
        }
        param.remove("userAccount");
        param.put("userEmail", accountOrEmail);
        userInfo = userDao.selectWithCondition(param);
        if (null != userInfo && null != userInfo.get("userPassword")) {
            String correctPassword = String.valueOf(userInfo.get("userPassword"));
            if (password.equals(correctPassword)) {
                return userInfo;
            }
        }
        return null;
    }

    public String register(Map<String, String> param) {
        Map<String, String> tUserInfo = new HashMap();
        tUserInfo.put("userAccount", String.valueOf(param.get("userAccount")));
        tUserInfo = userDao.selectWithCondition(tUserInfo);
        if (null != tUserInfo && null != tUserInfo.get("userId")) {
            return "该登录名已存在";
        }
        userDao.insert(param);
        return null;
    }

    public String update(Map<String, String> param) {
        Map<String, String> tUserInfo = new HashMap();
        tUserInfo.put("userAccount", String.valueOf(param.get("userAccount")));
        tUserInfo = userDao.selectWithCondition(tUserInfo);
        if (null != tUserInfo && null != tUserInfo.get("userId")) {
            if (!tUserInfo.get("userId").equals(param.get("userId"))) {
                return "该登录名已存在";
            }
        }
        userDao.update(param);
        return null;
    }




}
