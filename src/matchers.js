import exact from "./matchers/exact";
import indistinguishable from "./matchers/indistinguishable";

export default {
  symmetric: {
    ...exact.symmetric,
    ...indistinguishable.symmetric,
  },
  asymmetric: {
    ...exact.asymmetric,
    ...indistinguishable.asymmetric,
  },
};
