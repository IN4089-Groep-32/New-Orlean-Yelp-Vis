const CONSTANTS = {};

CONSTANTS.ERROR_MESSAGE = {};

CONSTANTS.ERROR_MESSAGE.GRID_GET = "Request to get grid text failed:";

CONSTANTS.ENDPOINT = {};

CONSTANTS.ENDPOINT.GRID = "/api/grid";
CONSTANTS.ENDPOINT.PCA = "/api/pca.csv";
CONSTANTS.ENDPOINT.MDS = "/api/mds.csv";
CONSTANTS.ENDPOINT.TSNE = "/api/tsne.csv";

CONSTANTS.ENDPOINT.GEO = "/api/geo";

CONSTANTS.SIZE = {};
CONSTANTS.SIZE.MARGIN = { top: 30, right: 50, bottom: 30, left: 50 };
CONSTANTS.SIZE.WIDTH = 500 - CONSTANTS.SIZE.MARGIN.left - CONSTANTS.SIZE.MARGIN.right;
CONSTANTS.SIZE.HEIGHT = 300 - CONSTANTS.SIZE.MARGIN.top - CONSTANTS.SIZE.MARGIN.bottom;

CONSTANTS.PRECOMPUTED_DATA = {}
CONSTANTS.PRECOMPUTED_DATA.GEO = "../../precomputed_data/geo/"
CONSTANTS.PRECOMPUTED_DATA.REVIEWS_CONTENT = "../../precomputed_data/reviews_content/"
CONSTANTS.PRECOMPUTED_DATA.BOX = "../../precomputed_data/box/"
CONSTANTS.PRECOMPUTED_DATA.WORDSTREAM = "../../precomputed_data/ws/"
CONSTANTS.PRECOMPUTED_DATA.STAR = "../../precomputed_data/star/"
CONSTANTS.PRECOMPUTED_DATA.SCATTERPLOT = "../../precomputed_data/reviews_count/"

export default CONSTANTS;
