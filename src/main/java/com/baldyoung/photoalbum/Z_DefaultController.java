package com.baldyoung.photoalbum;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/")
public class Z_DefaultController {

    @GetMapping
    public void index(HttpServletResponse response) throws IOException {
        response.sendRedirect("/photoAlbum/front/index.html");
    }



}
