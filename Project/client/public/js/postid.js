
const postData = {
      _id: "<%= post._id %>",
      title: "<%= post.title %>",
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
      phone: "<%= owner.phone %>",
      petImage:"<%= owner.petImage %>",
      petAge:"<%= owner.petAge %>",
      petWeight:"<%= owner.petWeight %>",
      petType:"<%= owner.petType %>",
      userID: "<%= owner.userID %>",
      avatar:"<%= owner.avatar %>",
      createdAt: "<%= owner.createdAt %>",
      updatedAt: "<%= owner.updatedAt %>"
    }

const sitterPostData = {
      _id: "<%= post._id %>",
      title: "<%= post.title %>",
      rate: "<%= post.rate %>",
      serivces: "<%= post.services %>",
      experience: "<%= post. experience %>",
      userID: "<%= post.userID %>",
    }

const sitterProfile = {
      _id: "<%= sitter._id %>",
      name: "<%= sitter.name %>",
      province: "<%= sitter.province %>",
      city: "<%= sitter.city %>",
      phone: "<%= sitter.phone %>",
      userID: "<%= sitter.userID %>",
      aboutme:"<%= sitter.aboutme %>",
      avatar:"<%= sitter.avatar %>",
      photo1:"<%= sitter.photo1 %>",
      photo2:"<%= sitter.photo2 %>",
      photo3:"<%= sitter.photo3 %>",
      createdAt: "<%= sitter.createdAt %>",
      updatedAt: "<%= sitter.updatedAt %>"
    }

