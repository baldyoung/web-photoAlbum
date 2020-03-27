package com.baldyoung.photoalbum.common.utility;

import java.util.Date;

public class ValueUtility {

    public static boolean isAnyEmtpy(Object... objects) {
        if (null == objects) {
            return true;
        }
        for(Object object : objects) {
            if (isEmpty(object)) {
                return true;
            }
        }
        return false;
    }

    public static boolean isEmpty(Object object) {
        if (null == object) {
            return true;
        }
        String string = object.toString();
        for (int i=0; i<string.length(); i++) {
            if (string.charAt(i) != ' ') {
                return false;
            }
        }
        return true;
    }

    public static Integer toInteger(Object object) {
        if (null == object) {

            return null;
        }
        Integer result = Integer.parseInt(String.valueOf(object));
        return result;
    }

    public static Date toDate(Object object) {
        if (null == object || !(object instanceof Date)) {
            return null;
        }
        return (Date)object;
    }
}
