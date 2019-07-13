package com.career.entities;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class MetaEntity {

    private String nameColumn;

    private String typeColumn;

    private String typeValue;
//
//    public static List<MetaEntity> buildMeta(ReportIncidentsDto entity) {
//        Map<String, String> keys = entity.getKey();
//        List<MetaEntity> metaEntities = new LinkedList<>();
//        for (Map.Entry<String, String> filter : keys.entrySet()) {
//            MetaEntity metaEntity = new MetaEntity(
//                    filter.getKey(),
//                    filter.getKey().getClass().getSimpleName(),
//                    filter.getValue().getClass().getSimpleName()
//            );
//            metaEntities.add(metaEntity);
//        }
//        for (ReportIncidentsDto.ColumnSumEntity filter : entity.getEntities()) {
//            String clCol = decodeClass(filter.getColumnName().getClass());
//            String clVal = decodeClass(filter.getSum().getClass());
//            MetaEntity metaEntity = new MetaEntity(
//                    filter.getColumnName().toString(),
//                    clCol,
//                    clVal
//            );
//            metaEntities.add(metaEntity);
//        }
//        return metaEntities;
//    }
//
//    private static String decodeClass(Class cl) {
//        if (cl.isAssignableFrom(LocalDate.class)) {
//            return "Date";
//        } else return cl.getSimpleName();
//    }
//
//    public static List<MetaEntity> buildGenericMeta(Class clazz){
//        String deafaultColumnType = String.class.getSimpleName();
//        List<MetaEntity> metaEntities = new LinkedList<>();
//        Field[] fields = clazz.getDeclaredFields();
//        for (Field field : fields) {
//
//            MetaEntity metaEntity = new MetaEntity(
//                    field.getName(),
//                    deafaultColumnType,
//                    field.getType().getSimpleName()
//            );
//            metaEntities.add(metaEntity);
//        }
//        return metaEntities;
//    }

}
