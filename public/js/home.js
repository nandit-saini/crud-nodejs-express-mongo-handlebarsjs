$(document).ready(function(){

	//New User Insertion form appended
	$("body").on("click",".create",function(){

		var tempVars = Handlebars.compile($("#create-template").html());
		$(".area").html(tempVars);

	});

	//New user form submition
	$("body").on("submit","#create_user_form",function(e){

		e.preventDefault();

		$.ajax({

			url:"/users/new",
			type:"POST",
			data:$(this).serialize()
		}).done(function(data){	
			
			if(data._id)
			{
				$(".error").addClass("alert alert-success").html("New User Added Successfully");
			}
			else 
			{
				$(".error").addClass("alert alert-danger").html("New User Insertion Failed");	
			}

		});

	});

	//View Users
	$("body").on("click",".view_users",function(){

		var sort_by = "_id";
		var sort_order = 1;
		var page_no = 1;
		var search_value = "";
		getUsersByPage (page_no,sort_by,sort_order,search_value);

	});

	//Delete user
	$("body").on("click",".del_btn",function(){

		var id = $(this).attr("data");
		var self = $(this);
		var search_value = $("#search_input").val();

		$.ajax({

			url:"/users/"+id,
			type:"DELETE"

		}).done(function(response){

			var page_no = 1;
			var sort_by = $("#sort_by").val();
			var sort_order = $("#sort_order").val();
			var search_value = $("#search_input").val();
			getUsersByPage (page_no,sort_by,sort_order,search_value);

		});

	});	

	//Edit User
	$("body").on("click",".edit_btn",function(){

		var id = $(this).attr("data");
		$.ajax({

			url:"/users/"+id,
			type:"GET"

		}).done(function(data){

			var tempVars = Handlebars.compile($("#edit-template").html());
			var tempFinal = tempVars(data);
			$(".area").html(tempFinal);

		});		

	});	

	//Edit User Form Submission
	$("body").on("submit","#edit_user_form",function(e){

		e.preventDefault();

		var id = $("#user_id").val();

		$.ajax({

			url:"/users/"+id,
			type:"PUT",
			data:$(this).serialize()

		}).done(function(data){

			if(data.ok === 1)
			{
				$(".error").addClass("alert alert-success").html("User Updated Successfully");
			}
			else 
			{
				$(".error").addClass("alert alert-success").html("User Updation Failed");
			}

		});

	});


	//Go back to view users
	$("body").on("click","#go_back",function(e){

		e.preventDefault();
		var sort_by = "_id";
		var sort_order = 1;
		var page_no = 1;
		var search_value = "";
		getUsersByPage (page_no,sort_by,sort_order,search_value);

	});

	//getting pagewise records of the users

	$("body").on("click",".page_no",function(e){

		e.preventDefault();
		$(".page_no").parent().removeClass("active");
		$(this).parent().addClass("active");
		
		var page_no = $(this).html();
		var sort_by = $("#sort_by").val();
		var sort_order = $("#sort_order").val();
		var search_value = $("#search_input").val();

		getUsersByPage (page_no,sort_by,sort_order,search_value);

	});


	//checking for the active page using handlebars.js

	Handlebars.registerHelper("check", function(value1, value2,options) {
	  
	  if(value1===value2)
	  	return options.fn(this);
	  else return options.inverse(this);

	});

	//getting sorted results according to the sortorder

	$("body").on("change","#sort_by",function(){

		var sort_by = $("#sort_by").val();
		var sort_order = $("#sort_order").val();
		var page_no = 1;
		var search_value = $("#search_input").val();
		getUsersByPage (page_no,sort_by,sort_order,search_value);

	});

	//getting sorted results according to the sortorder
	$("body").on("change","#sort_order",function(){

		var sort_by = $("#sort_by").val();
		var sort_order = $("#sort_order").val();
		var page_no = 1;
		var search_value = $("#search_input").val();
		getUsersByPage (page_no,sort_by,sort_order,search_value);

	});


	$("body").on("click",".filter_btn",function(){

		var sort_by = $("#sort_by").val();
		var sort_order = $("#sort_order").val();
		var page_no = 1;
		var search_value = $("#search_input").val();
		getUsersByPage (page_no,sort_by,sort_order,search_value);

	});



});

function getUsersByPage (page_no,sort_by,sort_order,search_value) {
	
	$.ajax({

		url:"/users/page/"+page_no,
		type:"GET",
		data:{sort_by:sort_by,sort_order:sort_order,search_value:search_value}				

	}).done(function(data){

		var tempVars = Handlebars.compile($("#view-users").html());
		var tempFinal = tempVars(data);
		$(".area").html(tempFinal);
		$("#sort_by").val(data.sortby)
		$("#sort_order").val(data.sortorder)
		$(".error").removeClass("alert alert-success").removeClass("alert alert-danger").html("");

	});	
}