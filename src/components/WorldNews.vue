<template>
  <div class="content">
    <div class="news-container">
      <h2>World News</h2>
      <input class="search" type="text" placeholder="search" v-model="searchString" @input="onSearch(searchString)">
      <div class="sorting-container">
        <span class="text">Sort by:</span>
        <span class="sorting-button" v-bind:class="{'asc' : sortDirectionAsc === true && sortBy === 'title', 'desc' : sortDirectionAsc === false && sortBy === 'title' }" @click="sort('title')">Title</span>
        <span class="sorting-button" v-bind:class="{'asc' : sortDirectionAsc === true && sortBy === 'author', 'desc' : sortDirectionAsc === false && sortBy === 'author' }" @click="sort('author')">Author</span>
        <span class="sorting-button" v-bind:class="{'asc' : sortDirectionAsc === true && sortBy === 'body', 'desc' : sortDirectionAsc === false && sortBy === 'body' }" @click="sort('body')">Body</span>
      </div>
      <article class="article" v-for="(article) in articles" :key="article">
        <span @click="editArticle(article.id)">edit</span>
        <h3>{{ article.title }}</h3>
        <h4>{{ article.author }}</h4>
        <p>{{ article.body }}</p>
      </article>
    </div>
    <div class="sidebar">
      <h2>Add/edit article</h2>
      <form @submit.prevent="addArticle()">
        <input type="text" v-model="title" placeholder="title">
        <input type="text" v-model="author" placeholder="author">
        <textarea v-model="body" placeholder="body" rows="10"></textarea>
        <button class="button">Submit</button>
        <p class="error-text" v-if="formError">form is incomplete</p>
      </form>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'WorldNews',
  data() {
    return {
      articles: store.state.articles,
      sortBy: '',
      sortDirectionAsc: false,
      formError: false,
      title: '',
      author: '',
      body: '',
      searchString: '',
      editingArticle: false,
      articleToEdit: undefined
    }
  },
  methods: {
    onSearch: function(searchString) {
      if (searchString) {
        return this.articles = store.state.articles.filter(article => article.title.toLowerCase().includes(searchString.toLowerCase()))
      } else {
        return this.articles = store.state.articles
      }
    },
    sort: function(sortBy) {
      this.sortBy = sortBy
      if (this.sortDirectionAsc) {
        this.sortDirectionAsc = !this.sortDirectionAsc
        this.sortDesc(sortBy)
      } else if (this.sortDirectionAsc == false) {
        this.sortDirectionAsc = !this.sortDirectionAsc
        this.sortAsc(sortBy)
      }
    },
    sortAsc: function(sortBy) {
      return this.articles = this.articles.sort(
          function(a, b) {
            a = a[sortBy].toLowerCase();
            b = b[sortBy].toLowerCase();
            
            if (a < b)
              return -1
            if (a > b)
              return 1
            return 0
          }
        )
    },
    sortDesc: function(sortBy) {
      return this.articles = this.articles.sort(
          function(a, b) {
            a = a[sortBy].toLowerCase()
            b = b[sortBy].toLowerCase()

            if (a > b)
              return -1
            if (a < b)
              return 1
            return 0
          }
        )
    },
    addArticle: function() {
      if(this.title && this.author && this.body) { 
        if(this.formError) {
          this.formError = false
        }
        let newArticle = {
          id: this.editingArticle ? this.articleToEdit : store.state.articles.length + 1,
          title: this.title,
          author: this.author,
          body: this.body
        }

        if(this.editingArticle) {
          store.commit('editArticle', newArticle)
          this.editingArticle = false;
        } else {
          store.commit('addArticle', newArticle)
        }

        this.title = ''
        this.author = ''
        this.body = ''
      } else {
        this.formError = true
      }
    },
    editArticle: function(articleId) {
      let articleToEdit = store.state.articles.find(element => element.id == articleId)
      this.title = articleToEdit.title;
      this.author = articleToEdit.author;
      this.body = articleToEdit.body;
      this.editingArticle = true;
      this.articleToEdit = articleId;
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.content {
  display: flex;
  padding: 0 10px;
  text-align: left;
}

.news-container {
  flex-basis: 60%;
  margin-right: 32px;
  .article {
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    &:first-of-type {
      margin-top: 30px;
    }
    h3, h4 {
      margin: 0;
    }
  }
}

.sidebar {
  flex-basis: 40%;
  input {
    margin-bottom: 10px;
  }
}

input, textarea {
  width: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 10px;
  font-size: 16px;
}

input {
    height: 48px;
}

.sorting-container {
  margin: 10px 0;
}
.sorting-button {
  margin-left: 10px;  
  text-decoration: underline;
  position: relative;
  display: inline-flex;
  width: auto;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &.desc {
    &:after {
      content: '';
      width: 0; 
      height: 0; 
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #222;
      margin-left: 5px;
    }
  }
  &.asc {
    &:after {
      content: '';
      width: 0; 
      height: 0; 
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #222;
      margin-left: 5px;
    }
  }
}

.button {
  height: 48px;
  border: none;
  background: #222;
  color: #fff;
  width: 100%;
  font-size: 16px;
  &:hover {
    background: #111;
    cursor: pointer;
  }
}

.error-text {
  color: red;
}
</style>
