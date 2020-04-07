package com.baldyoung.photoalbum.common.dao;


import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * 用户 - 数据库访问
 */
@Repository
public interface UserDao {

    Map selectWithCondition(@Param("user")Map<String, String> user);

    void insert(@Param("user")Map<String, String> user);

    void update(@Param("user")Map<String, String> user);

}
