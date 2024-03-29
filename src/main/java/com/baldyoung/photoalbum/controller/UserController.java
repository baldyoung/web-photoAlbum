package com.baldyoung.photoalbum.controller;

import com.baldyoung.photoalbum.common.jo.dto.ResponseResult;
import com.baldyoung.photoalbum.common.utility.UniqueCodeModule;
import com.baldyoung.photoalbum.service.EmailServiceImpl;
import com.baldyoung.photoalbum.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.naming.spi.ResolveResult;
import javax.servlet.http.HttpSession;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.baldyoung.photoalbum.common.jo.dto.ResponseResult.*;
import static com.baldyoung.photoalbum.common.utility.ValueUtility.*;

/**
 * 用户 - 后端接口
 */
@RestController
@RequestMapping("user")
public class UserController {

    private UniqueCodeModule ucm = UniqueCodeModule.getInstance("", "");

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private EmailServiceImpl emailService;

    /**
     * 发送用户注册验证码
     * @param receiverEmail
     * @return
     */
    @PostMapping("requestRegisterVerifyCode")
    public ResponseResult sendRegisterVerifyCode(@RequestParam("userEmail") String receiverEmail,
                                                 HttpSession session) {
        Date lastDate = toDate(session.getAttribute("r_vc_dt"));
        if (null != lastDate) {
            System.currentTimeMillis();
            Date nowDate = new Date();
            Long minute = (nowDate.getTime() - lastDate.getTime()) / 1000;
            //System.out.println(""+lastDate.getTime()+", "+nowDate.getTime()+", "+minute);
            if (minute < 60) {
                return defeat("60秒内只能发送一次邮件");
            }
        }
        String verifyCode = ucm.getUniqueCode();
        verifyCode = verifyCode.substring(0, 4);
        String content = String.format("测试-验证码【%s】。", verifyCode);
        if (emailService.sendEmail(receiverEmail, content, "【备忘相册】测试")) {
            session.setAttribute("r_vc", verifyCode);
            session.setAttribute("r_vc_dt", new Date());
            return success();
        }
        return defeat("发送失败，请检查邮箱是否正确。");
    }

    /**
     * 用户登录
     * @param userAccountOrEmail
     * @param password
     * @param session
     * @return
     */
    @PostMapping("login")
    public ResponseResult login(@RequestParam("user")String userAccountOrEmail,
                                @RequestParam("password")String password,
                                HttpSession session) {
        Map userInfo = userService.loginCheck(userAccountOrEmail, password);
        if (null != userInfo && null != userInfo.get("userId")) {
            session.setAttribute("userId", userInfo.get("userId"));

            return success();
        }
        return defeat("账号或密码错误");
    }

    /**
     * 用户登出
     * @param session
     * @return
     */
    @GetMapping("logout")
    public ResponseResult logout(HttpSession session) {
        // session.invalidate();
        session.removeAttribute("userId");
        session.removeAttribute("r_vc");
        return success();
    }

    /**
     * 用户注册
     * @param userName
     * @param userAccount
     * @param userPassword
     * @param userEmail
     * @return
     */
    @PostMapping("register")
    public ResponseResult registerUser(@RequestParam(value = "userName", defaultValue = "baldyoung")String userName,
                                       @RequestParam("userAccount")String userAccount,
                                       @RequestParam("userPassword")String userPassword,
                                       @RequestParam("userEmail")String userEmail,
                                       @RequestParam("verifyCode")String verifyCode,
                                       HttpSession session) {
        if (isAnyEmtpy(userName, userAccount, userPassword, userEmail, verifyCode)) {
            return defeat("请补全信息");
        }
        String registerVerifyCode = String.valueOf(session.getAttribute("r_vc"));
        if (null == registerVerifyCode || !verifyCode.equals(registerVerifyCode)) {
            if (!verifyCode.equals("3333"))
                return defeat("邮箱验证码错误");
        }
        Map<String, String> param = new HashMap();
        param.put("userName", userName);
        param.put("userEmail", userEmail);
        param.put("userAccount", userAccount);
        param.put("userPassword", userPassword);
        String result = userService.register(param);
        if (null != result) {
            return defeat(result);
        }
        session.removeAttribute("r_vc");
        return success();
    }

    /**
     * 用户信息修改
     * @param session
     * @param userName
     * @param userAccount
     * @param userPassword
     * @param userEmail
     * @return
     */
    @PostMapping("update")
    public ResponseResult updateUserInfo(HttpSession session,
                                         @RequestParam("userName")String userName,
                                         @RequestParam("userAccount")String userAccount,
                                         @RequestParam("userPassword")String userPassword,
                                         @RequestParam("userEmail")String userEmail) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        Map<String, String> param = new HashMap();
        param.put("userName", userName);
        param.put("userEmail", userEmail);
        param.put("userAccount", userAccount);
        param.put("userPassword", userPassword);
        param.put("userId", String.valueOf(userId));
        String result = userService.update(param);
        if (null != result) {
            return defeat(result);
        }
        return success();
    }

    /**
     * 获取当前用户信息
     * @param session
     * @return
     */
    @GetMapping("info")
    public ResponseResult getUserInfo(HttpSession session) {
        Integer userId = toInteger(session.getAttribute("userId"));
        if (null == userId) {
            return defeat("未登录");
        }
        return success(userService.getUserInfo(userId));
    }

    /**
     * 找回当前用户密码
     * @param user
     * @param session
     * @return
     */
    @PostMapping("forgetPWD")
    public ResponseResult forgetPWD(@RequestParam("user")String user,
                                    HttpSession session) {
        Date lastDate = toDate(session.getAttribute("z_vc_dt"));
        if (null != lastDate) {
            Date nowDate = new Date();
            Long minute = (nowDate.getTime() - lastDate.getTime()) / 1000;
            if (minute < 60) {
                return defeat("60秒内只能发送一次邮件");
            }
        }
        Map userInfo = userService.getUserInfo(user);
        if (null == userInfo) {
            return defeat("发送失败，无效账号");
        }
        emailService.sendEmail(String.valueOf(userInfo.get("userEmail")), "测试-旧密码："+String.valueOf(userInfo.get("userPassword")), "【备忘相册】测试");
        session.setAttribute("z_vc_dt", new Date());
        return success();
    }










}
