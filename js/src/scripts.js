// Bsckbone Model

var Blog = Backbone.Model.extend({
  defaults: {
    author: '',
    title: '',
    url: ''
  }
});

//Backbone Collection

var Blogs = Backbone.Collection.extend({});

//instantiate two Blogs

/*var blog1 = new Blog({
  author: 'Michel',
  title: 'Michael\'s Blog',
  url: 'http://michaelsblog.com'
});

var blog2 = new Blog({
  author: 'John',
  title: 'John\'s Blog',
  url: 'http://johnsblog.com'
})*/

// instantiate a Collection
var blogs = new Blogs();
console.log('blogs collection initialized', blogs);

//Backbone View for one blog

var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  className: 'blog-item',
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel': 'cancel',
    'click .delete-blog': 'delete'
  },

  initialize: function() {
    this.template = _.template(  $('.blogs-list-template').html()  );
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  edit: function() {
    $('.edit-blog').hide();
    $('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel').show();

    var author = this.$('.author').html();
    var title = this.$('.title').html();
    var url = this.$('.url').html();

    this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
    this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
    this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');

  },
  update: function() {
    this.model.set('author', $('.author-update').val());
    this.model.set('title', $('.title-update').val());
    this.model.set('url', $('.url-update').val());
  },
  cancel: function() {
    blogsView.render();
  },
  delete: function() {
    this.model.destroy();
  },
});

// Backbone View for all blogs

var BlogsView = Backbone.View.extend({
  model: blogs,

  el: $('.blogs-list'),

  initialize: function() {
    var self = this;

    // listen for any change on collection
    this.model.on('add', this.render, this);
    this.model.on('change', function() {
      setTimeout(function() {
        self.render();
      }, 30);
    }, this);

    this.model.on('remove', this.render, this);
  },

  render: function() {
    var self = this;

    // clear html
    self.$el.html('');

    _.each(this.model.toArray(), function(blog) {

      // create new blog view
      var itemView = new BlogView({
        model: blog
      });

      self.$el.append(itemView.render().$el);
    });
    return this;
  }
});

var blogsView = new BlogsView();
console.log('blogs view (list) created', blogsView);


$(document).ready(function() {
  console.log('document is now ready');

  $('.add-blog').on('click', function() {
    console.log('element with class ".add-blog" was clicked');

    // create a blog model
    var blog = new Blog({
      author: $('.author-input').val(),
      title: $('.title-input').val(),
      url: $('.url-input').val()
    });

    // clear inputs
    $('.author-input').val('');
    $('.title-input').val('');
    $('.url-input').val('');

    // console.log('blog model', blog);
    console.log('blog model (toJson)', blog.toJSON());

    blogs.add(blog);
    console.log('blogs collection', blogs);
  })

  //---------obrisi sve----------
  $('.deleteall').on('click', function() {
    console.log('element with class ".deleteall" was clicked');

    // Delete all blogs
    var deleteall = delete Blogs()
  })


})
