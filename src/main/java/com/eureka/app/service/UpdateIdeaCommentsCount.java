package com.eureka.app.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;

import com.eureka.app.model.Idea;
import com.eureka.app.model.IdeaComments;

public class UpdateIdeaCommentsCount {
	
	private static MongoOperations mongoOperations;

    @Autowired
    public UpdateIdeaCommentsCount(MongoOperations mongoOperations) {
    	this.mongoOperations = mongoOperations;
    }
    
    public static int updateIdeaCommentsCount(String ideaId, List<IdeaComments> ideaComments) {
        Idea idea = mongoOperations.findAndModify(query(where("_id").is(ideaId)),
                new Update().set("commentsCount", ideaComments.size()),
                options().returnNew(true).upsert(true),
                Idea.class);
        return idea.getCommentsCount();
    }
}
