import exact from "./matchers/exact";

export default {
  symmetric: {
    ...exact.symmetric,
  },
  asymmetric: {
    ...exact.asymmetric,
  },
};
