/* eslint-disable no-param-reassign */
const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    const { lng, lat, distance, ...newFilter } = filter;
    const pipeline = [];
    let sort = {};
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push({ [key]: order === 'desc' ? -1 : 1 });
      });
      sort = sortingCriteria.reduce((mergedObj, obj) => {
        return { ...mergedObj, ...obj };
      }, {});
    } else {
      sort = { createdAt: 1 };
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    if (newFilter.name) {
      newFilter.name = { $regex: newFilter.name, $options: 'i' };
    } else {
      delete newFilter.name;
    }

    if (newFilter.facilityTags) {
      newFilter.facilityTags = { $in: newFilter.facilityTags };
    }

    if (lat && lng && distance) {
      pipeline.unshift({
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [+lng, +lat],
          },
          distanceField: 'distance',
          maxDistance: +distance >= 0 ? +distance : Infinity,
          spherical: true,
        },
      });
    }

    pipeline.push({ $match: newFilter });
    pipeline.push({ $count: 'totalResults' });

    const countPromise = await this.aggregate(pipeline).exec();

    pipeline.pop();

    pipeline.push({ $sort: sort });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    let docsPromise = this.aggregate(pipeline);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise
          .lookup({
            from: `${populateOption}s`,
            localField: populateOption,
            foreignField: '_id',
            as: populateOption,
          })
          .unwind(populateOption);
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [countResult, docsResult] = values;
      const totalResults = countResult.length > 0 ? countResult[0].totalResults : 0;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results: docsResult,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
