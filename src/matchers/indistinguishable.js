import Color from "color";
import { rgba_to_lab, diff } from "color-diff";
import {
  matcherHint,
  EXPECTED_COLOR,
  RECEIVED_COLOR,
} from "jest-matcher-utils";

function expectedColor(expected) {
  return Color(expected.length === 1 ? expected[0] : expected);
}

function predicate(received, expected) {
  const colorReceived = Color(received).rgb();
  const colorExpected = expectedColor(expected).rgb();
  const labReceived = rgba_to_lab({
    R: colorReceived.color[0],
    G: colorReceived.color[1],
    B: colorReceived.color[2],
    A: colorReceived.valpha,
  });
  const labExpected = rgba_to_lab({
    R: colorExpected.color[0],
    G: colorExpected.color[1],
    B: colorExpected.color[2],
    A: colorExpected.valpha,
  });
  const deltaE = diff(labReceived, labExpected);
  return [deltaE < 1, deltaE];
}

function message(received, expected, inverse, deltaE) {
  const not = inverse ? " NOT " : " ";
  return () =>
    `${matcherHint(
      `${inverse ? ".not" : ""}.toBeColor`,
      "received",
      "expected",
    )}\n\nExpected color to${not}be perceptually indistinguishable from:\n  ${EXPECTED_COLOR(
      Color(expectedColor(expected))
        .rgb()
        .string(),
    )}\nbut ${
      inverse
        ? "it was perceptually indistinguishable from:"
        : "instead received:"
    }\n  ${RECEIVED_COLOR(
      Color(received)
        .rgb()
        .string(),
    )}\nTo${not}be indistinguishable, the difference in color must be ${
      inverse ? "greater than" : "less than"
    } 1. It currently is:\n  ${RECEIVED_COLOR(deltaE)}`;
}

class IndistinguishableFrom {
  constructor(inverse = false, ...sample) {
    this.$$typeof = Symbol.for("jest.asymmetricMatcher");
    this.sample = sample;
    this.inverse = inverse;
  }

  asymmetricMatch(other) {
    return this.inverse
      ? !predicate(other, this.sample)[0]
      : predicate(other, this.sample)[0];
  }

  toString() {
    return `${this.inverse ? "Not" : ""}IndistinguishableFrom`;
  }

  toAsymmetricMatcher() {
    return `${this.inverse ? "Not" : ""}IndistinguishableFrom<${expectedColor(
      this.sample,
    )
      .rgb()
      .string()}>`;
  }
}

export default {
  symmetric: {
    toBeIndistinguishableFrom(received, ...expected) {
      const [pass, deltaE] = predicate(received, expected);
      return {
        pass,
        message: message(received, expected, pass, deltaE),
      };
    },
  },
  asymmetric: {
    indistinguishableFrom: IndistinguishableFrom,
  },
};
