import Color from "color";
import {
  matcherHint,
  EXPECTED_COLOR,
  RECEIVED_COLOR,
} from "jest-matcher-utils";

function expectedColor(expected) {
  return Color(expected.length === 1 ? expected[0] : expected);
}

function predicate(received, expected) {
  return (
    Color(received)
      .rgb()
      .string() ===
    expectedColor(expected)
      .rgb()
      .string()
  );
}

function message(received, expected, inverse) {
  return () =>
    `${matcherHint(
      `${inverse ? ".not" : ""}.toBeColor`,
      "received",
      "expected",
    )}\n\nExpected color to${
      inverse ? " NOT " : " "
    }be identical to:\n  ${EXPECTED_COLOR(
      Color(expectedColor(expected))
        .rgb()
        .string(),
    )}\nbut ${
      inverse ? "it was identical to:" : "instead received:"
    }\n  ${RECEIVED_COLOR(
      Color(received)
        .rgb()
        .string(),
    )}`;
}

class ExactColor {
  constructor(inverse = false, ...sample) {
    this.$$typeof = Symbol.for("jest.asymmetricMatcher");
    this.sample = sample;
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    return this.inverse
      ? !predicate(other, this.sample)
      : predicate(other, this.sample);
  }

  toString() {
    return `${this.inverse ? "Not" : ""}Color`;
  }

  toAsymmetricMatcher() {
    return `${this.inverse ? "Not" : ""}Color<${expectedColor(this.sample)
      .rgb()
      .string()}>`;
  }
}

export default {
  symmetric: {
    toBeColor(received, ...expected) {
      const pass = predicate(received, expected);
      return {
        pass,
        message: message(received, expected, pass),
      };
    },
  },
  asymmetric: {
    color: ExactColor,
  },
};
