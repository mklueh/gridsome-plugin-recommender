const _ = require("lodash");
const pluginName = require("./package.json").name;
const ContentBasedRecommender = require('content-based-recommender');

class GridsomeRecommender {

  static defaultOptions() {
    return {
      collection: undefined,
      field: undefined,
      minScore: 0.1,
      maxScore: 1,
      maxRelations: 10
    }
  }

  constructor(api, options) {
    this.api = api;
    this.validateOptions(options);
    this.options = Object.assign(GridsomeRecommender.defaultOptions(), options);
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

    if (!options.collection) throw `${pluginName}: You need to define options.collection in your options you want to create recommendations for`;
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
    console.log(actions.store)
    const collection = actions.getCollection("Tag");
    console.log("collection", collection)
  }

  /**
   * Trains model based on given nodes
   *
   * @param nodes
   */
  train(nodes) {
    const documents = nodes.map(this.convertNodeToDocument);
    this.recommender.train(documents);
  }

  /**
   * Convert node to document based on defined option.field
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
   * @returns {[{id:1,score:0}]}
   */
  fetchDocumentRelations(id) {
    return this.recommender.getSimilarDocuments(id, 0, this.options.maxRelations);
  }

  /**
   * Create node relations for one node in collection / GraphQl
   *
   * @param id
   * @param documentRelations
   */
  createNodeRelations(id, documentRelations) {

  }

}


module.exports = GridsomeRecommender;
