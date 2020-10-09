const _ = require("lodash");
const pluginName = require("./package.json").name;
const ContentBasedRecommender = require('content-based-recommender');

/**
 * Gridsome Recommender Plugin
 *
 * A Gridsome plugin to find relations between objects using machine learning.
 *
 * For more information visit https://overflowed.dev
 *
 * @author Marian Klühspies
 *
 */
class RecommenderPlugin {

    static defaultOptions() {
        return {
            enabled: true,
            /**
             * {typeName} is the name of the collection
             * we relate to
             * required
             */
            typeName: undefined,

            /**
             * Optional reference connection.
             * If provided, the similarities will only be searched
             * in the opposite collection, depending on which document is provided
             * as a lookup
             */
            referenceTypeName: undefined,

            /**
             * {field} is the collection field we
             * train our model with
             * required
             */
            field: undefined,

            /**
             * {referenceField} is the collection field we
             * train our model with from the referenceCollection
             * required if referenceCollection is set
             */
            referenceField: undefined,

            /**
             * relation field name that gets added to the collection
             * containing all related elements
             */
            relatedFieldName: 'related',

            referenceRelatedFieldName: 'related',
            /**
             * {minScore} is the minimum similarity score
             * required for being considered "similar"
             */
            minScore: 0.01,
            maxScore: 1,
            /**
             * {maxRelations} is the number of relations to be produced
             * per node as a maximum
             */
            maxRelations: 10,
            /**
             * {minRelations} is the number of relations to be produced
             * per node as a minimum. As a consequence nodes are factored in
             * that might not be related as fillers to reach this number
             */
            minRelations: 3,
            /**
             * {fillWIthUnrelated} will always fill relations per node
             * to {minRelations} with random nodes
             */
            fillWithRandom: false,
            caseSensitive: false,
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
        if (!options.field) throw `${pluginName}: You need to define options.field in your options you want to create recommendations for`;
        if (options.typeName && !options.field) throw `${pluginName}: You need to define options.referenceField if you are defining a referenceCollection`;
        if (!options.minScore && !_.inRange(options.minScore, 0, 1)) throw `${pluginName}: options.minScore need to be in range between [0,1]`;
        if (!options.maxScore && !_.inRange(options.maxScore, 0, 1)) throw `${pluginName}: options.maxScore need to be in range between [0,1]`;
        if (!options.maxRelations && !_.inRange(options.maxRelations, 0, 100)) throw `${pluginName}: options.maxRelations need to be in range between [0,100]`;
        if (!options.minRelations && !_.inRange(options.minRelations, 0, 100)) throw `${pluginName}: options.minRelations need to be in range between [0,100]`;

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

        if (this.options.referenceTypeName) {
            const referenceCollection = actions.getCollection(this.options.referenceTypeName);
            if (!collection) throw `${pluginName}: options.typeName '${this.options.typeName}' cannot be found - make sure the collection exists`;
            this.trainBidirectional(collection, referenceCollection);
            this.createCollectionRelations(collection, context, actions, false);
            this.createCollectionRelations(referenceCollection, context, actions, true);
        } else {
            this.train(collection);
            this.createCollectionRelations(collection, context, actions, false);
        }

        this.log("finished")
    }

    createCollectionRelations(collection, context, actions,reversed) {
        collection.data().forEach((node) => {
            let relations = this.fetchDocumentRelations.call(context, node.id);
            if (this.options.fillWithRandom && relations.length < this.options.minRelations) {
                this.log(`minRelations ${this.options.minRelations} not reached - filling with ${relations.length} random relations`)
                relations = this.fillWithRandomRelations(collection, relations, node.id);
                console.log(node.id, " has ", relations)
            }
            this.createNodeRelations(collection, actions.store, node, relations,reversed);
        })
    }

    /**
     * Trains model based on given collection
     *
     * @param collection
     */
    train(collection) {
        let convertedDocuments = collection.data().map(node => {
            return this.convertDocument(node, this.options.field);
        });
        this.log("training " + convertedDocuments.length);
        this.recommender.train(convertedDocuments);
    }

    /**
     *
     * @param collection
     * @param referenceCollection
     */
    trainBidirectional(collection, referenceCollection) {
        let convertedDocuments = collection.data().map(node => {
            return this.convertDocument(node, this.options.field);
        });
        let convertedReferenceDocuments = referenceCollection.data().map(node => {
            return this.convertDocument(node, this.options.referenceField);
        });
        this.log("training " + convertedDocuments.length);
        this.recommender.trainBidirectional(convertedDocuments, convertedReferenceDocuments);
    }

    convertDocument(node, field) {
        const doc = this.convertNodeToDocument(node, field)
        if (this.options.caseSensitive) doc.content = doc.content.toLowerCase();
        return doc;
    }

    /**
     * Convert node to document schema based on defined option.field
     *
     * TODO To be used with multiple fields, it might be enough to concatenate them to one string
     *
     * @param node
     * @param field
     * @returns {{id: *, content: *}}
     */
    convertNodeToDocument(node, field) {
        return {
            id: node.id,
            content: node[field]
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
     * Better we have a list here to create fast subsets
     * Operate on collection or on documents or only on ids?
     *
     * @param collection
     * @param documentRelations
     * @param excludedDocumentId id of the current page
     */
    fillWithRandomRelations(collection, documentRelations, excludedDocumentId) {
        const numElementsMissing = this.options.minRelations - documentRelations.length;
        this.log(`Missing ${numElementsMissing} relations to minRelations of ${this.options.minRelations}`)

        const fillers = this.getArraySubsetExcluding(collection, documentRelations, numElementsMissing, excludedDocumentId)
            .map(f => this.convertNodeToDocument(f));

        return documentRelations.concat(fillers)
    }

    /**
     * Returns a subset of the collection excluding given list of nodes
     *
     * @param collection
     * @param toExclude
     * @param count
     * @param excludedDocumentId
     * @returns {any[]}
     */
    getArraySubsetExcluding(collection, toExclude, count, excludedDocumentId) {
        const nodes = collection.data();
        const numberFillers = Math.min(nodes.length - toExclude.length, count);
        const hash = new Set();
        hash.add(excludedDocumentId);
        toExclude.forEach(e => hash.add(e.id));
        const result = [];
        let i = 0;

        do {
            let item = nodes[Math.floor(Math.random() * (nodes.length))];
            if (hash.has(item.id)) continue;
            result.push(this.convertNodeToDocument(item));
            hash.add(item.id);
            i++;
        } while (i < numberFillers)

        return result;
    }

    /**
     * Create node relations for one node in collection / GraphQl
     *
     * @param collection
     * @param store
     * @param node
     * @param documentRelations
     */
    createNodeRelations(collection, store, node, documentRelations, reverse) {
        let options = {...node};
        options[!reverse ? this.options.relatedFieldName : this.options.referenceRelatedFieldName] = documentRelations
            .map(relation => {
                /*
                 *Decide if we reference A-A or A-B
                 */
                const field = !reverse && this.options.referenceTypeName || this.options.typeName;

                return store.createReference(field, relation.id)
            });
        collection.updateNode(options)
    }

    log(a) {
        if (this.options.debug) console.log(`${pluginName}: `, a);
    }

}

module.exports = RecommenderPlugin;
