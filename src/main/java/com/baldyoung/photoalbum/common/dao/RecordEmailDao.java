package com.baldyoung.photoalbum.common.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 邮件记录 - 数据库访问
 */
@Repository
public interface RecordEmailDao {

    void insert(@Param("param")Map<String, String> param);
}
