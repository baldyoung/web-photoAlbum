package com.baldyoung.photoalbum;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Order(1)
@WebFilter(filterName = "piceaFilter", urlPatterns = "/*" , initParams = {
        @WebInitParam(name = "URL", value = " ")})
public class GlobalFilter implements Filter {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private String url;
    /**
     * 可以初始化Filter在web.xml里面配置的初始化参数
     * filter对象只会创建一次，init方法也只会执行一次。
     * @param filterConfig
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("photoAlbum >>> 登录拦截构建中...");
    }

    /**
     * 主要的业务代码编写方法
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpSession session = httpServletRequest.getSession();
        if (null == session.getAttribute("userId")) {
            String url = httpServletRequest.getRequestURI();
            if (url.equals("") || url.equals("/") || url.contains("login") || url.contains("common")) {
            } else {
                logger.warn("photoAlbum >>> 非法访问["+url+"]");
                httpServletResponse.sendRedirect("/photoAlbum/front/login/login.html");
                return;
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    /**
     * 在销毁Filter时自动调用。
     */
    @Override
    public void destroy() {
        //System.out.println("我是过滤器的被销毁时调用的方法！，活不下去了................" );
    }
}

