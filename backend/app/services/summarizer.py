import nltk
from nltk.tokenize import sent_tokenize
from nltk.chunk import ne_chunk
import numpy as np
import networkx as nx
from sklearn.feature_extraction.text import TfidfVectorizer

# use custom textRank method to summarize articles
# alternatives are article.nlp() or gpt or frequency based etc.
def summarize_article(article, num_sentences=5, keyword_weight = 1.5, position_weight=1.2, ner_weight=1.3):
    
    # tokenize the article into sentences
    sentences = sent_tokenize(article)

    # vectorize the sentences using TF-IDF
    vectorizer = TfidfVectorizer()
    sentence_vectors = vectorizer.fit_transform(sentences).toarray()

    # compute the cosine similarity matrix 
    similarity_matrix = np.dot(sentence_vectors, sentence_vectors.T)
    
    # apply position weighting (earlier sentences often have key context)
    position_scores = np.linspace(position_weight, 1, len(sentences)) # high at start, decrease latter on

    # identify named entities for weighting (named entity recognition - ner)
    ner_score = []
    for sentence in sentences:
        words = nltk.word_tokenize(sentence)
        tags = nltk.pos_tag(words) # part of speech tagging (eg: noun, verb etc)
        chunked = ne_chunk(tags, binary=True)
        named_entities = []
        for subtree in chunked:
            if isinstance(subtree, nltk.Tree):  # Named entity is usually a Tree
                named_entities.append(" ".join(word for word, tag in subtree))

        ner_score.append(1 + (len(named_entities)*(ner_weight - 1))) # boost the score based on entity count

    # build the graph where nodes are sentences and edges are the weights
    nx_graph = nx.from_numpy_array(similarity_matrix)

    # compute the PageRank scores
    scores = nx.pagerank(nx_graph)

    # apply weights to the scores
    weighted_scores = {
        i: scores[i] * position_scores[i] * ner_score[i] for i in range(len(sentences))
    }

    # rank the sentences based on the weighted scores
    ranked_sentences = sorted(((weighted_scores[i], s) for i, s in enumerate(sentences)), reverse=True)

    # extract the top sentences
    summary = " ".join([s for _,s in ranked_sentences[:num_sentences]])
    return summary