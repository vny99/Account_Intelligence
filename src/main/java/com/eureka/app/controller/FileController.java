package com.eureka.app.controller;

import java.io.IOException;

import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.eureka.app.model.FileEntity;
@RestController
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
@RequestMapping("file")
public class FileController {
	@Autowired
	private com.eureka.app.service.FileService service;
	@PostMapping(value="/upload",consumes = {"multipart/form-data"})
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile uploadedFile) throws IOException{
		
		return new ResponseEntity<>(service.uploadFile(uploadedFile),HttpStatus.OK);
		
	}
	@GetMapping("/download/{id}")
	public ResponseEntity<ByteArrayResource> download(@PathVariable String id) throws IOException{
		FileEntity fileEntity=service.downloadFile(id);
		
		
		 return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(fileEntity.getFileType() ))
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +fileEntity.getFileName()+ "\"")
	                .body(new ByteArrayResource(fileEntity.getFile()));
	}
	@GetMapping("/get/{id}")
	public ResponseEntity<?> getFile(@PathVariable String id) throws IOException{
		return new ResponseEntity<>(service.findFile(id),HttpStatus.OK);
	}
	@GetMapping("/delete/{id}")
	public ResponseEntity<?> deleteFile(@PathVariable String id)throws  IOException{
		return new ResponseEntity<>(service.deleteFile(id),HttpStatus.OK);
	}

}
