package com.baldyoung.photoalbum.controller;

import com.baldyoung.photoalbum.service.TagServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("tag")
public class TagController {

    @Autowired
    private TagServiceImpl tagService;

    //@PostMapping("add")



}
