package com.baldyoung.photoalbum.common.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ImageDao {


    List<Map> selectByAlbumId(@Param("albumId")Integer albumId);

    List<Map> selectByTagName(@Param("tagName")String tagName, @Param("userId")Integer userId);

    Map selectByImageId(@Param("imageId")Integer imageId);

    Map selectByImageFileName(@Param("fileName")String fileName);

    void insertImage(@Param("image")Map<String, String> image);

    void insertLink(@Param("link")Map<String, String> link);

   // void updateImage(@Param("image")Map<String, String> image);

    void deleteImage(@Param("imageId")Integer imageId, @Param("userId")Integer userId);

    void updateImage(@Param("param")Map<String, String> param);

    Integer countImageForAlbum(@Param("albumId")Integer albumId);

    void deleteLink(@Param("imageId")Integer imageId);
}
