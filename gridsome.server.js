const _ = require("lodash");
const pluginName = require("./package.json").name;
const ContentBasedRecommender = require('content-based-recommender');

class RecommenderPlugin {

    static defaultOptions() {
        return {
            enabled: true,
            typeName: undefined,
            field: undefined,
            relatedFieldName: 'related',
            minScore: 0.1,
            maxScore: 1,
            maxRelations: 10,
        }
    }

    constructor(api, options) {
        this.api = api;
        this.validateOptions(options);
        this.options = Object.assign(RecommenderPlugin.defaultOptions(), options);

        if (!this.options.enabled) {

            return;
        }

        this.recommender = new ContentBasedRecommender({
            minScore: this.options.minScore,
            maxSimilarDocuments: this.options.maxRelations
        });

        api.loadSource(this.loadSource.bind(this))
    }

    /**
     * Validations for user-defined options in gridsome.config.js
     *
     * @param options
     */
    validateOptions(options) {
        if (options === undefined) throw `Options not defined for ${pluginName}`

        if (!options.typeName) throw `${pluginName}: You need to define options.collection in your options you want to create recommendations for`;
        if (!options.field) throw `${pluginName}: You need to define options..field in your options you want to create recommendations for`;


        //if options.minScore === undefined -> false, if in range -> false
        // minScore === undefined
        if (!options.minScore && !_.inRange(options.minScore, 0, 1)) throw `${pluginName}: options.minScore need to be in range between [0,1]`;
        if (!options.maxScore && !_.inRange(options.maxScore, 0, 1)) throw `${pluginName}: options.maxScore need to be in range between [0,1]`;
        if (!options.maxRelations && !_.inRange(options.maxScore, 0, 100)) throw `${pluginName}: options.maxRelations need to be in range between [0,100]`;

    }


    /**
     * Load all nodes from given collection
     *
     * @param actions
     */
    loadSource(actions) {
        const collection = actions.getCollection(this.options.typeName);

        if (!collection) throw `${pluginName}: options.typeName '${this.options.typeName}' cannot be found - make sure the collection exists`;

        this.train(collection);

        collection.data().forEach((node) => {
            const relations = this.fetchDocumentRelations(node.id);
            this.createNodeRelations(collection, actions.store, node.id, relations);
        })
    }


    /**
     * Trains model based on given collection
     *
     * @param collection
     */
    train(collection) {
        this.recommender.train(collection.data().map(this.convertNodeToDocument.bind(this)));
    }

    /**
     * Convert node to document schema based on defined option.field
     *
     * TODO To be used with multiple fields, it might be enough to concatenate them to one string
     *
     * @param node
     * @returns {{id: *, content: *}}
     */
    convertNodeToDocument(node) {
        return {
            id: node.id,
            content: node[this.options.field]
        }
    }

    /**
     * Creates an array of related documents with similarity score
     *
     * @param id
     * @returns {[{id:1,score:1}]}
     */
    fetchDocumentRelations(id) {
        return this.recommender.getSimilarDocuments(id, 0, this.options.maxRelations);
    }

    /**
     * Create node relations for one node in collection / GraphQl
     *
     * @param collection
     * @param store
     * @param id
     * @param documentRelations
     */
    createNodeRelations(collection, store, id, documentRelations) {
        console.log("id ", id, " has relations ", documentRelations);
        collection.data().forEach((node) => {
            const related = node.related || [];
            documentRelations.forEach(id => {
                related.push(store.createReference(this.options.typeName, id));
                collection.updateNode({...node, related: related})
            });
            if (documentRelations.length === 0) collection.updateNode({...node, related: []})
        });
    }

}

module.exports = RecommenderPlugin;
