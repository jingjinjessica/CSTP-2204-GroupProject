
const postData = {
      _id: "<%= post._id %>",
      title: "<%= post.title %>",
      province: "<%= post.province %>",
      city: "<%= post.city %>",
      desc: "<%= post.desc %>",
      startDate: "<%= post.startDate %>",
      endDate: "<%= post.endDate %>",
      userID: "<%= post.userID %>",
      createdAt: "<%= post.createdAt %>",
      updatedAt: "<%= post.updatedAt %>"
    }

const ownerProfile = {
      _id: "<%= owner._id %>",
      name: "<%= owner.name %>",
      province: "<%= owner.province %>",
      city: "<%= owner.city %>",
      phone: "<%= owner.phone%>",
      petImage:"<%= owner.petImage%>",
      petAge:"<%= owner.petAge%>",
      petWeight:"<%= owner.petWeight%>",
      petType:"<%= owner.petType%>",
      userID: "<%= owner.userID %>",
      avatar:"<%= owner.avatar%>",
      createdAt: "<%= owner.createdAt %>",
      updatedAt: "<%= owner.updatedAt %>"
    }



    // (function() {
 
    // $('#chatBox header').on('click', function() {
 
    //    $('.chat').slideToggle(300, 'swing');
 
    // });
 
    // }) ();
 
    // $(document).ready(function(){
 
    //     var preloadbg = document.createElement("img");
    //     preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
    
    //     $("#searchfield").focus(function(){
    //     if($(this).val() == "Search contacts..."){
    //         $(this).val("");
    //     }
    //     });
    //     $("#searchfield").focusout(function(){
    //     if($(this).val() == ""){
    //         $(this).val("Search contacts...");
            
    //     }
    //     });
    
    //     $("#sendmessage input").focus(function(){
    //     if($(this).val() == "Send message..."){
    //         $(this).val("");
    //     }
    //     });
    //     $("#sendmessage input").focusout(function(){
    //     if($(this).val() == ""){
    //         $(this).val("Send message...");
            
    //     }
    //     });
       
 
    //     $(".friend").each(function(){		
    //     $(this).click(function(){
    //         var childOffset = $(this).offset();
    //         var parentOffset = $(this).parent().parent().offset();
    //         var childTop = childOffset.top - parentOffset.top;
    //         var clone = $(this).find('img').eq(0).clone();
    //         var top = childTop+17+"px";
            
    //         $(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatContainer");									
            
    //         setTimeout(function(){$("#profileInfo p").addClass("animate");$("#profileInfo").addClass("animate");}, 100);
    //         setTimeout(function(){
    //             $("#chat-content").addClass("animate");
    //             $('.cx, .cy').addClass('s1');
    //             setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
    //             setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
    //         }, 150);														
            
    //         $('.floatingImg').animate({
    //             'width': "50px",
    //             'left':'15px',
    //             'top':'20px'
    //         }, 200);
            
    //         var name = $(this).find("p strong").html();
    //         var email = $(this).find("p span").html();														
    //         $("#profileInfo p").html(name);
    //         $("#profileInfo span").html(email);			
            
    //         $(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
    //         $('#friendslist').fadeOut();
    //         $('#chatview').fadeIn();
        
            
    //         $('#close').unbind("click").click(function(){				
    //             $("#chat-content, #profileInfo, #profileInfo p").removeClass("animate");
    //             $('.cx, .cy').removeClass("s1 s2 s3");
    //             $('.floatingImg').animate({
    //                 'width': "50px",
    //                 'top':top,
    //                 'left': '15px'
    //             }, 200, function(){$('.floatingImg').remove()});				
                
    //             setTimeout(function(){
    //                 $('#chatview').fadeOut();
    //                 $('#friendslist').fadeIn();				
    //             }, 50);
    //         });   
    //     });
    // });			
// });