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
            minScore: 0.01,
            maxScore: 1,
            maxRelations: 10,
            debug: false
        }
    }

    constructor(api, options) {
        this.api = api;
        this.validateOptions(options);
        this.options = Object.assign(RecommenderPlugin.defaultOptions(), options);

        if (!this.options.enabled) return;

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
        const context = this;
        const collection = actions.getCollection(this.options.typeName);

        if (!collection) throw `${pluginName}: options.typeName '${this.options.typeName}' cannot be found - make sure the collection exists`;

        this.train(collection);

        collection.data().forEach((node) => {
            const relations = this.fetchDocumentRelations.call(context, node.id);
            this.createNodeRelations(collection, actions.store, node, relations);
        })
    }

    /**
     * Trains model based on given collection
     *
     * @param collection
     */
    train(collection) {
        let convertedDocuments = collection.data().map(this.convertNodeToDocument.bind(this));
        this.log("training", convertedDocuments);
        this.recommender.train(convertedDocuments);
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
     * @param node
     * @param documentRelations
     */
    createNodeRelations(collection, store, node, documentRelations) {
        this.log("createNodeRelations - ", "id ", node.id, " has relations ", documentRelations);
        let options = {...node};
        options[this.options.relatedFieldName] = documentRelations.map(relation => store.createReference(this.options.typeName, relation.id));
        collection.updateNode(options)
    }

    log() {
        if (this.options.debug) console.log(`${pluginName}: `, arguments);
    }

}

module.exports = RecommenderPlugin;
