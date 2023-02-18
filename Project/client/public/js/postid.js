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