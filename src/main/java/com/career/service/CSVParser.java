package com.career.service;

import com.opencsv.bean.CsvToBeanBuilder;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;

@Service
@Log4j2
public class CSVParser {

    private static final char SEPARATOR = ';';

    public <T> List<T> parseEntities(MultipartFile file, Class<T> type) throws IOException {
        InputStream initialStream = new ByteArrayInputStream(file.getBytes());
        Reader targetReader = new InputStreamReader(initialStream);
        return new CsvToBeanBuilder<T>(targetReader)
                .withType(type).withSeparator(SEPARATOR).build().parse();
    }
}
