package com.eureka.app.model;

import java.util.Arrays;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "FileEntity")
public class FileEntity {
	@Id
	private String fileId;
	private String fileName;
	private String fileType;
	private String fileSize;
	private  byte[] file;
	public FileEntity(String fileId, String fileName, String fileType, String fileSize, byte[] file) {
		super();
		this.fileId = fileId;
		this.fileName = fileName;
		this.fileType = fileType;
		this.fileSize = fileSize;
		this.file = file;
	}
	public FileEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "FileEntity [fileId=" + fileId + ", fileName=" + fileName + ", fileType=" + fileType + ", fileSize="
				+ fileSize + ", file=" + Arrays.toString(file) + "]";
	}
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public byte[] getFile() {
		return file;
	}
	public void setFile(byte[] file) {
		this.file = file;
	}
	

}
