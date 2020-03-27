package com.baldyoung.photoalbum.common.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AlbumDao {

    List<Map> selectByUserId(@Param("userId")Integer userId);

    Map selectByAlbumId(@Param("albumId")Integer albumId);

    void insert(@Param("album")Map<String, String> album);

    void update(@Param("album")Map<String, String> album);

    void delete(@Param("albumId")Integer albumId);





}
