package com.career.controller;

import com.career.dao.ReviewCompanyRepo;
import com.career.dao.ReviewSalaryRepo;
import com.career.dao.ReviewSelectionRepo;
import com.career.entities.ReviewCompanyEntity;
import com.career.entities.ReviewSalaryEntity;
import com.career.service.ReviewSrv;
import com.career.utils.JsonGetMapping;
import com.career.utils.JsonPostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/develop")
public class DevelopController {

    @Autowired
    private ReviewSrv reviewSrv;
    @Autowired
    private ReviewSelectionRepo reviewSelectionRepo;
    @Autowired
    private ReviewSalaryRepo reviewSalaryRepo;
    @Autowired
    private ReviewCompanyRepo reviewCompanyRepo;

    @JsonPostMapping("/common-csv")
    public void commonCsvUpload(@RequestParam("file") MultipartFile file) throws Exception {
        reviewSrv.saveCommonCsv(file);
    }

    @JsonPostMapping("/salary-csv")
    public void salaryCsvUpload(@RequestParam("file") MultipartFile file) throws Exception {
        reviewSrv.saveSalaryCsv(file);
    }

    @JsonPostMapping("/selection-csv")
    public void selectionCsvUpload(@RequestParam("file") MultipartFile file) throws Exception {
        reviewSrv.saveSelectionCsv(file);
    }

    @JsonGetMapping("/common-csv")
    public List<ReviewCompanyEntity> commonCsvUpload() throws Exception {
        return reviewCompanyRepo.findAll();
    }

    @JsonGetMapping("/salary-csv")
    public List<ReviewSalaryEntity> salaryCsvUpload() throws Exception {
        return reviewSalaryRepo.findAll();
    }

    @JsonGetMapping("/selection-csv")
    public ReviewSelectionRepo selectionCsvUpload() throws Exception {
        return reviewSelectionRepo;
    }



}
