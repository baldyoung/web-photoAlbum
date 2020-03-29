package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

import static com.baldyoung.photoalbum.common.utility.ValueUtility.toInteger;

@Component
public class UserServiceImpl {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

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
            Integer userId = toInteger(param.get("userId"));
            Integer aUserId = toInteger(tUserInfo.get("userId"));
            logger.info("登录名冲突:"+userId+" -> "+aUserId);
            if (!aUserId.equals(userId)) {
                return "该登录名已存在";
            }
        }
        userDao.update(param);
        return null;
    }

    public Map getUserInfo(Integer userId) {
        Map<String, String> param = new HashMap();
        param.put("userId", String.valueOf(userId));
        return userDao.selectWithCondition(param);
    }




}
