package com.eureka.app.service;

import java.io.IOException;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import com.eureka.app.model.FileEntity;
import com.eureka.app.model.Idea;
import com.eureka.app.repository.IdeasRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;

@Service
public class FileService {
	@Autowired
	private GridFsTemplate template;
	@Autowired
	private GridFsOperations operations;
	@Autowired
	private IdeasRepository ideaRepo;
	public String  uploadFile(MultipartFile uploadedFile) throws IOException{
		DBObject metadata= new BasicDBObject();
		metadata.put("fileSize", uploadedFile.getSize());
		Object fileId= template.store(uploadedFile.getInputStream(),uploadedFile.getContentType(),uploadedFile.getOriginalFilename(),metadata);
		return fileId.toString();
		
	}
	public FileEntity downloadFile (String id) throws IOException{
		GridFSFile gridFSFile =template.findOne(new Query(Criteria.where("_id").is(id)));
		FileEntity fileEntity=new FileEntity();
		if(gridFSFile!=null &&gridFSFile.getMetadata()!=null) {
			fileEntity.setFileType(gridFSFile.getFilename());
			fileEntity.setFileSize(gridFSFile.getMetadata().get("fileSize").toString());
			fileEntity.setFileName(gridFSFile.getMetadata().get("_contentType").toString());
			fileEntity.setFile(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()));
			
		}
		return fileEntity;
	}
	public String findFile(String id) throws IOException{
		GridFSFile gridFSFile=template.findOne(new Query(Criteria.where("_id").is(id)));
		
		if(gridFSFile!=null&&gridFSFile.getMetadata()!=null) {
			return gridFSFile.getMetadata().get("_contentType").toString();
		}
		return null;
	}
	public boolean deleteFile(String id) throws IOException{
		GridFSFile gridFSFile=template.findOne(new Query(Criteria.where("_id").is(id)));
		if(gridFSFile!=null&&gridFSFile.getMetadata()!=null) {
			 template.delete(new Query(Criteria.where("_id").is(id)));
			 Idea myidea= this.ideaRepo.findByFileId(id);
			 myidea.setFileId(null);
			 ideaRepo.save(myidea);
			 
			 return true;
		}
		return false;
		
		
	}
	

}
