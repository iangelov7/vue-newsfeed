import { createStore } from "vuex";
import articles from "../assets/mock_data.json"

export default createStore({
    state() {
        return {
            articles: articles
        }
    },
    mutations: {
        addArticle(state, article) {
            state.articles.unshift(article)
        },
        editArticle(state, article) {
            let articleToEdit = state.articles.find(element => element.id == article.id)
            articleToEdit.title = article.title
            articleToEdit.author = article.author
            articleToEdit.body = article.body
        }
    }
})