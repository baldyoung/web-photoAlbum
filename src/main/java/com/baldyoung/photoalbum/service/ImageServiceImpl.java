package com.baldyoung.photoalbum.service;

import com.baldyoung.photoalbum.common.dao.ImageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImageServiceImpl {

    @Autowired
    private ImageDao imageDao;



}
