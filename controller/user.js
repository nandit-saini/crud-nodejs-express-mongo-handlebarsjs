'use strict';

var User = require('../model/user').User;

/** create function to create User. */
exports.create = function (req, res) {  

    User.create(req.body, function(err, result) {
        if (!err) {
            console.log(result);
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};

/** getPage function to get User by page. */
exports.getPage = function (req, res) {

    var page = parseInt(req.params.page),
     size = 5,
     skip = page > 0 ? ((page - 1) * size) : 0;

    var query = {skip: skip,limit: size}    
    var sortby = req.query.sort_by;
    var sortorder = req.query.sort_order;
    var search_value = req.query.search_value;

    if((typeof sortby && sortby) && (typeof sortorder && sortorder))
    {  
        var temp = {};
        temp[sortby] = sortorder;
        query.sort = temp;
    }
    
    var find_query = {};
    
    if(search_value!="")
     find_query["$or"] = [{name: new RegExp(search_value, 'i')} , {email : new RegExp(search_value, 'i')}];
    
    User.getPageRecords(find_query,query, function(err, result) {
        
        if (!err) {

            User.getAllCount(find_query,function(err,counter){

                var total_pages = Math.ceil(counter/size);
                var page_list = generatePageArray(page,size,total_pages);
                res.json({records:result,pages:page_list,current_page:page,sortby:sortby,sortorder:sortorder,search_value:search_value});

            });
            
        } else {
            return res.send(err); // 500 error
        }
    });
};

/** getAll function to get all User. */
exports.getAll = function (req, res) {

    User.getAll({}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};

/** get function to get all User. */
exports.get = function (req, res) {

    User.get({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
};

/** updateUser function to get User by id. */
exports.update = function (req, res) {

    User.updateById(req.params.id, req.body, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
}

/** removeUser function to get User by id. */
exports.delete = function (req, res) {
    
    User.removeById({_id: req.params.id}, function(err, result) {
        if (!err) {
           User.getAll({}, function(err, result) {
                if (!err) {
                    return res.json(result);
                } else {
                    return res.send(err); // 500 error
                }
            });
        } else {
            console.log(err);
            return res.send(err); // 500 error
        }
    });
}

/** Generate pagination array */
function generatePageArray(page,size,total_pages)
{
    var last_page = total_pages;
    var page_list = [];
    var current_page = page;

    if(total_pages<=7)
    {
        for(var i=1;i<=total_pages;i++)
            page_list.push(i);
    }
    else if (current_page < last_page-2 && current_page > 3 )
    {
        page_list.push(1);
        page_list.push(current_page-2);
        page_list.push(current_page-1);
        page_list.push(current_page);
        page_list.push(current_page+1);
        page_list.push(current_page+2);
        page_list.push(last_page);
    }
    else if (current_page <= 3 )
    {
        for(var i=1;i<=current_page;i++)
            page_list.push(i);

        page_list.push(current_page+1);
        page_list.push(current_page+2);
        page_list.push(last_page);
    }
    else if (current_page >=last_page-2)
    {
        page_list.push(1);
        page_list.push(current_page-2);
        page_list.push(current_page-1);

        for(var i=current_page;i<=total_pages;i++)
            page_list.push(i);

    }

    if(page_list.length>1)
        return page_list;
}