package com.baldyoung.photoalbum.common.utility;

public class ValueUtility {

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
        System.out.println("toInteger:"+object);
        if (null == object) {

            return null;
        }
        Integer result = Integer.parseInt(String.valueOf(object));
        return result;
    }
}
