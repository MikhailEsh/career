package com.jraphql.cn.wzvtcsoft.x.bos.domain.util;

import com.jraphql.cn.wzvtcsoft.x.bos.domain.IBostype;

import java.util.Arrays;
import java.util.HashSet;
import java.util.UUID;

public class BostypeUtils {

    /**
     * 获取到的id只可能是[a-zA-Z0-9]另外还有-这63个字符。
     *
     * @param bostypeenum
     * @return
     */
    public static String getBostypeid(IBostype bostypeenum) {
        String miniuuid = getMiniuuid(null);
        return miniuuid + bostypeenum.toString();
    }


    public static boolean isBostype(String id, IBostype be) {
        return be.toString().equals(id.substring(22));
    }


    /**
     * 主要是考虑id是否需要在url、
     * json字符串中、
     * sql字符串中、
     * javascript字符串中、
     * 其他语言字符串中
     * 是否需要进行转义编码。
     * 因此去掉了一些特殊字符如=/$/?/%/+/&//空格/+等。最终采用26+26+10+2（-、_)的字符集。
     * <p>
     * 而且考虑到最后一个字符必须为数字，好与后面的bostype分隔开，所以采用的是0，1，2，3
     *
     * @return
     */
    //TODO 用缓存优化，先生成好100个，到40个的时候再去加到100个，
    static String getMiniuuid(String uid) {
        String id = null;
        int i = 0;
        do {
            i++;
            id = getInternalMiniuuid(uid);
        }
        while (id.contains("-") || new HashSet(Arrays.asList("0", "1", "2", "3", "4", "5", "6", "7", "8", "9")).contains(id.substring(0, 1)));
        //System.out.println(i+":"+id);

        return id;
    }


    public static void main(String[] args) {
        for (int i = 0; i < 100; i++) {
            getMiniuuid(null);
        }
    }

    private static String getInternalMiniuuid(String uid) {
        if ((uid == null || "".equals(uid.trim())) || (uid.trim().length() != 32)) {
            uid = UUID.randomUUID().toString().replaceAll("-", "");
        }

        //System.out.println(uid);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            int a = Integer.valueOf(uid.substring(3 * i, 3 * i + 1), 16)
                    .intValue();
            int b = Integer.valueOf(uid.substring(3 * i + 1, 3 * i + 2), 16)
                    .intValue();
            int c = Integer.valueOf(uid.substring(3 * i + 2, 3 * i + 3), 16)
                    .intValue();

            int m = ((a << 2) & 0x3c) + ((b >> 2) & 0x03);
            int n = ((b << 4) & 0x30) + (c & 0x0f);
            sb.append(getchar(m));
            sb.append(getchar(n));
        }
        int a = Integer.valueOf(uid.substring(30, 31), 16).intValue();
        int b = Integer.valueOf(uid.substring(31, 32), 16).intValue();

        int m = ((a << 2) & 0x3c) + ((b >> 2) & 0x03);

        sb.append(getchar(m));
        int n = b & 0x03;

        sb.append(getlastchar(n));

        // 将ID编码成更友好的类似于变量标识符的ID，包括首字不能为数字。将字符串中的java转意
        return sb.toString();


    }

    private static char getlastchar(int n) {
        if (n == 0) {
            return '0';//35
        } else if (n == 1) {
            return '1';//(char)36;
        } else if (n == 2) {
            return '2';//(char)37;
        } else if (n == 3) {
            return '3';//(char)38;
        } else {
            throw new RuntimeException("hhhh!!!");
        }
    }

    private static char getchar(int x) {
        int charint = 0;
        if ((x >= 0) && (x <= 9)) {//'0'-'9'
            charint = 48 + x;
        } else if (x == 10) {
            charint = 95;//'_'
        } else if (x == 11) {
            charint = 45;//'-'
        } else if ((x >= 12) && (x <= 37)) {
            charint = ((x - 12) + 65);//'A'-'Z'
        } else if (x >= 38 && x <= 63) {
            charint = ((x - 38) + 97);//'a'-'z'
        } else {
            throw new RuntimeException("hhhh!!!");
        }
        return (char) charint;
    }

    /**
     * 生成N位大写字母或数字的短串，有时很有用
     *
     * @param length
     * @return
     */
    public static String getShortNumber(int length) {
        String x = null;
        String result = null;
        do {
            x = getMiniuuid(null);
            result = x.substring(0, 8).toUpperCase();
        } while (result.indexOf('-') > 0 || result.indexOf('_') > 0);
        return result;
    }


}
